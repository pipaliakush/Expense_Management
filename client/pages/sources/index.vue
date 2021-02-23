<template>
  <Sources />
</template>

<script>
import Sources from "@/components/Sources/index.vue";

export default {
  watchQuery: true,
  middleware: "authenticated",
  components: {
    Sources
  },
  async asyncData({ store, query }) {
    store.commit("sources", null);

    store.commit("isLoading", true);

    await store
      .dispatch("getSources", query)
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
      title: "Sources - Expense Management"
    };
  }
};
</script>
