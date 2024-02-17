<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <img
          class="img-fluid"
          :src="product.imageUrl"
          :alt="product.description"
        />
      </div>
      <div class="col-sm-6 d-flex flex-column">
        <span class="align-self-start badge bg-primary rounded-pill"></span>
        <p>商品描述： {{ product.description }}</p>
        <p>商品內容： {{ product.content }}</p>
        <del class="h6">原價 {{ product.origin_price }} 元</del>
        <div class="h5">現在只要 {{ product.price }} 元</div>
        <div class="mt-auto">
          <div class="input-group">
            <input type="number" class="form-control" min="1" v-model="qty" />
            <button type="button" class="btn btn-primary" @click="postCart(product.id)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoadingOverlay ref="LoadingOverlay" />
</template>

<script>
import { passAlert, errorAlert } from '@/assets/js/swal';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const { VITE_API, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
  },

  methods: {
    getSingleProduct() {
      const { id } = this.$route.params;
      this.$refs.LoadingOverlay.isLoading = true;
      this.$http
        .get(`${VITE_API}/v2/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.$refs.LoadingOverlay.isLoading = false;
        })
        .catch((err) => {
          errorAlert(err.response.data.message);
          this.$router.go(-1);
        });
    },
    postCart(productId) {
      this.$refs.LoadingOverlay.isLoading = true;
      const data = {
        product_id: productId,
        qty: this.qty,
      };
      this.$http
        .post(`${VITE_API}/v2/api/${VITE_PATH}/cart`, { data })
        .then((res) => {
          passAlert(res.data.message);
          this.$refs.LoadingOverlay.isLoading = false;
          this.qty = 1;
        })
        .catch((err) => {
          this.$refs.LoadingOverlay.isLoading = false;
          errorAlert(err.response.data.message);
        });
    },
  },

  mounted() {
    this.getSingleProduct();
  },

  components: {
    LoadingOverlay,
  },
};
</script>
