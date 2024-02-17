<template>
  <div class="container mt-5">
    <h2 class="d-flex justify-content-between">
      產品列表
      <button type="button" class="btn btn-primary" @click="openModal(null)">
        建立新的產品
      </button>
    </h2>
    <table class="table table-bordered text-center align-middle">
      <thead>
        <tr>
          <th scope="col">產品名稱</th>
          <th scope="col">產品類別</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productsList" :key="product.id">
          <th>{{ product.title }}</th>
          <td>{{ product.category }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <span class="text-primary" v-if="product.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary me-3"
              @click="openModal(product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct(product.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent
      :pagination-data="paginationData"
      @change-page="changePage"
    />
    <ProductModal
      :current-product="currentProduct"
      ref="modal"
      @seed-data="updateProduct"
    />
  </div>
</template>

<script>
import swel from 'sweetalert2';

import ProductModal from '@/components/admin/ProductModal.vue';
import PaginationComponent from '@/components/admin/PaginationComponent.vue';

const delCheckSwel2 = {
  title: '是否要刪除產品',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: '確定',
  cancelButtonText: '取消',
  reverseButtons: true,
};

const { VITE_API, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      productsList: [],
      paginationData: {},
      currentProduct: null,
      currentPage: 1,
      state: null,
      modal: null,
    };
  },
  methods: {
    // 檢查使用者
    postCheckUser() {
      // 取出 token
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('homeWork'))
        ?.split('=')[1];
      this.$http.defaults.headers.common.Authorization = token;
      this.$http
        .post(`${VITE_API}/v2/api/user/check`, null)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          const { message } = err.response.data;
          swel.fire({
            title: message,
            icon: 'error',
          });
          this.$router.push('/login');
        });
    },

    // 取得產品列表
    getProducts() {
      this.$http
        .get(`${VITE_API}/v2/api/${VITE_PATH}/admin/products/?page=${this.currentPage}`)
        .then((res) => {
          this.paginationData = res.data.pagination;
          this.productsList = res.data.products;
        })
        .catch((err) => {
          const { message } = err.response.data;
          swel.fire({
            title: message,
            icon: 'error',
          });
          this.$router.go(-1);
        });
    },

    // 新增、更新產品
    updateProduct(product) {
      const stateUrl = `/v2/api/${VITE_PATH}/admin/product/${
        product.id ? product.id : ''
      }`;
      this.$http[this.state](`${VITE_API}${stateUrl}`, { data: product })
        .then((res) => {
          const { message } = res.data;
          this.getProducts();
          swel.fire({
            title: message,
            icon: 'success',
          });
          this.modal.hide();
        })
        .catch(() => {
          swel.fire({
            title: '請確實輸入資料',
            icon: 'error',
          });
        });
    },

    // 產品刪除
    deleteProduct(id) {
      swel.fire(delCheckSwel2).then((result) => {
        if (result.isConfirmed) {
          this.$http
            .delete(`${VITE_API}/v2/api/${VITE_PATH}/admin/product/${id}`)
            .then((res) => {
              const { message } = res.data;
              this.getProducts();
              swel.fire({
                title: message,
                icon: 'success',
              });
            })
            .catch((err) => {
              const { message } = err.response.data;
              swel.fire({
                title: message,
                icon: 'error',
              });
            });
        }
      });
    },

    // 開啟 Modal
    openModal(product) {
      if (product) {
        this.currentProduct = { ...product };
        this.state = 'put';
      } else {
        this.currentProduct = {};
        this.state = 'post';
      }
      this.modal.show();
    },

    // 更改當前頁面值
    changePage(pageVal) {
      this.currentPage = pageVal;
      this.getProducts();
    },
  },

  mounted() {
    this.postCheckUser();
    this.modal = new this.$bs.Modal(this.$refs.modal.$el);
  },

  components: {
    ProductModal,
    PaginationComponent,
  },
};
</script>
