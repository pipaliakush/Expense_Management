<template>
  <Categories />
</template>

<script>
import Categories from "@/components/Categories/index.vue";

export default {
  watchQuery: true,
  middleware: "authenticated",
  components: {
    Categories
  },
  async asyncData({ store, query }) {
    store.commit("categories", null);

    store.commit("isLoading", true);

    await store
      .dispatch("getCategories", query)
      .then(() => {
        store.commit("isLoading", false);
      })
      .catch(() => {
        store.commit("isLoading", false);
      });

    return {};
  },
  head() {
    return {
      title: "Categories - Expense Management"
    };
  }
};
</script>
