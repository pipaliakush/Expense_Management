<template>
  <Transactions />
</template>

<script>
import Transactions from "@/components/Transactions/index.vue";

export default {
  watchQuery: true,
  middleware: "authenticated",
  components: {
    Transactions
  },
  async asyncData({ store, query }) {
    store.commit("transactions", null);

    store.commit("isLoading", true);

    await store
      .dispatch("getTransactions", query)
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
      title: "Transactions - Expense Management"
    };
  }
};
</script>
