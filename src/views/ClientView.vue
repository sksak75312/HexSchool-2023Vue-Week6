<template>
  <div class="container text-center">
    <h1>前台頁面</h1>
  </div>
  <div class="container">
    <nav class="navbar navbar-expand justify-content-center">
      <ul class="navbar-nav align-items-center list-unstyled">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link">首頁</RouterLink>
        </li>
        |
        <li class="nav-item">
          <RouterLink to="/products" class="nav-link">產品列表</RouterLink>
        </li>
        |
        <li class="nav-item">
          <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
        </li>
        |
        <li class="nav-item">
          <RouterLink to="/admin/products" class="nav-link"
            >後台頁面</RouterLink
          >
        </li>
      </ul>
    </nav>
  </div>
  <RouterView />
</template>

<script>
export default {};
</script>

<style lang="scss">
.navbar-nav .nav-link {
  &.router-link-exact-active,
  &:hover {
    color: #3fb984;
  }
}
</style>
