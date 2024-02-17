<template>
  <div class="container">
    <template v-if="cartData?.final_total">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteCart(null, '是否清空購物車')"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in cartData?.carts" :key="cart.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCart(cart.id, `是否刪除 ${cart.product.title}`)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                x
              </button>
            </td>
            <td>
              <div>{{ cart.product.title }}</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    :value="cart.qty"
                    @input="putCart(cart.id, $event)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    cart.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ cart.total }}
            </td>
          </tr>
          <!-- </template> -->
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData?.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="my-5 row justify-content-center">
        <OrderForm @reset-cart="getCart" />
      </div>
    </template>
    <h3 v-else>目前購物車無品項</h3>
  </div>
  <LoadingOverlayVue ref="LoadingOverlay" />
</template>

<script>
import debounce from 'lodash.debounce';

import OrderForm from '@/components/OrderForm.vue';
import LoadingOverlayVue from '@/components/LoadingOverlay.vue';

import { passAlert, errorAlert, confirmAlert } from '@/assets/js/swal';

const { VITE_API, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      cartData: null,
    };
  },

  methods: {
    // 取得購物車資訊
    getCart() {
      this.$refs.LoadingOverlay.isLoading = true;
      this.$http
        .get(`${VITE_API}/v2/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.$refs.LoadingOverlay.isLoading = false;
          this.cartData = res.data.data;
        })
        .catch((err) => {
          this.$refs.LoadingOverlay.isLoading = false;
          errorAlert(err.response.data.message);
        });
    },

    // 修改購物車數量
    putCart: debounce(function (productId, e) {
      this.$refs.LoadingOverlay.isLoading = true;
      const data = {
        product_id: productId,
        qty: Number(e.target.value),
      };
      this.$http
        .put(`${VITE_API}/v2/api/${VITE_PATH}/cart/${productId}`, { data })
        .then((res) => {
          this.$refs.LoadingOverlay.isLoading = false;
          passAlert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          this.$refs.LoadingOverlay.isLoading = false;
          errorAlert(err.response.data.message);
        });
    }, 1000),

    // 刪除購物車全品項及單一品項
    async deleteCart(productId, message) {
      const { isConfirmed } = await confirmAlert(message);
      if (isConfirmed) {
        this.$refs.LoadingOverlay.isLoading = true;
        const path = productId
          ? `/v2/api/${VITE_PATH}/cart/${productId}`
          : `/v2/api/${VITE_PATH}/carts`;
        this.$http
          .delete(`${VITE_API}${path}`)
          .then((res) => {
            passAlert(res.data.message);
            this.getCart();
            this.$refs.LoadingOverlay.isLoading = false;
          })
          .catch((err) => {
            errorAlert(err.response.data.message);
            this.$refs.LoadingOverlay.isLoading = false;
          });
      }
    },
  },

  mounted() {
    this.getCart();
  },

  components: {
    OrderForm,
    LoadingOverlayVue,
  },
};
</script>
