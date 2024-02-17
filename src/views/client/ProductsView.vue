<template>
  <div class="container">
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="singleProduct(product.id)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="postCart(product.id)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <LoadingOverlayVue ref="LoadingOverlay" />
</template>

<script>
import { passAlert, errorAlert } from '@/assets/js/swal';

import LoadingOverlayVue from '@/components/LoadingOverlay.vue';

const { VITE_API, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: null,
      tempData: {},
    };
  },
  methods: {
    // 取得客戶產品
    getClientProducts() {
      this.$refs.LoadingOverlay.isLoading = true;
      this.$http
        .get(`${VITE_API}/v2/api/${VITE_PATH}/products`)
        .then((res) => {
          this.products = res.data.products;
          this.$refs.LoadingOverlay.isLoading = false;
        })
        .catch((err) => {
          errorAlert(err.response.data.message);
          this.$refs.LoadingOverlay.isLoading = false;
        });
    },

    // 新增購物車品項
    postCart(productId, qty = 1) {
      this.$refs.LoadingOverlay.isLoading = true;
      const data = {
        product_id: productId,
        qty,
      };
      this.$http
        .post(`${VITE_API}/v2/api/${VITE_PATH}/cart`, { data })
        .then((res) => {
          passAlert(res.data.message);
          this.$refs.LoadingOverlay.isLoading = false;
        })
        .catch((err) => {
          this.$refs.LoadingOverlay.isLoading = false;
          errorAlert(err.response.data.message);
        });
    },

    singleProduct(id) {
      this.$router.push(`/product/${id}`);
    },

  },

  mounted() {
    this.getClientProducts();
  },

  components: {
    LoadingOverlayVue,
  },
};
</script>
