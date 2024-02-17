<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-10 col-md-6 col-xl-2">
          <VForm @submit="postLogin" v-slot="{ errors }">
            <h2 class="text-center mb-4">使用者登入</h2>
            <div class="form-floating mb-3">
              <VField
                type="email"
                name="信箱"
                class="form-control"
                id="floatingInput"
                placeholder="email"
                rules="required|email"
                :class="{ 'is-invalid': errors['信箱'] }"
                v-model.trim="user.username"
              >
              </VField>
              <label for="floatingInput">信箱</label>
              <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="form-floating mb-3">
              <VField
                type="password"
                name="密碼"
                class="form-control"
                id="floatingPassword"
                placeholder="password"
                rules="required"
                :class="{ 'is-invalid': errors['密碼'] }"
                v-model.trim="user.password"
              >
              </VField>
              <label for="floatingPassword">密碼</label>
              <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
            </div>
            <button type="submit" class="btn btn-primary w-100">登入</button>
          </VForm>
        </div>
      </div>
      <p class="mt-5 pt-5 h5 text-center text-secondary">
        六角學院 2023 Vue 直播班-第六週主線任務
      </p>
    </div>
  </div>
</template>

<script>
import { passAlert, errorAlert } from '@/assets/js/swal';

const { VITE_API } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    // 使用者登入
    postLogin() {
      const userVal = Object.values(this.user);
      if (userVal.includes('')) {
        return;
      }

      this.$http
        .post(`${VITE_API}/v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired, message } = res.data;
          document.cookie = `homeWork=${token}; expires=${new Date(expired)};`;
          passAlert(message);
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          const { message } = err.response.data;
          errorAlert(message);
        });
    },
  },
};
</script>
