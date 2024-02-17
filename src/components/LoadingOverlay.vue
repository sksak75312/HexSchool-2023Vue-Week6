<template>
    <Loading
      v-model:active="isLoading"
    />
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
};
</script>
