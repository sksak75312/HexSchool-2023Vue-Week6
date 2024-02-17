<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          :class="{ disabled: !pagination.has_pre }"
          @click.prevent="clickPage('pre')"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ active: page === pagination.current_page }"
      >
        <span class="page-link" v-if="page === pagination.current_page">
          {{ page }}
        </span>
        <a class="page-link" href="#" @click.prevent="clickPage(page)" v-else>
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          :class="{ disabled: !pagination.has_next }"
          @click.prevent="clickPage('next')"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['paginationData'],
  data() {
    return {
      pagination: {},
      currentPageStyle: ['active', 'disabledLink'],
    };
  },

  methods: {
    clickPage(pageVal) {
      let page = pageVal;
      if (pageVal === 'next') {
        page = this.pagination.current_page + 1;
      } else if (pageVal === 'pre') {
        page = this.pagination.current_page - 1;
      }
      this.$emit('change-page', page);
    },
  },

  watch: {
    paginationData(value) {
      this.pagination = value;
    },
  },
};
</script>
