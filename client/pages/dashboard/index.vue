<template>
  <Dashboard />
</template>

<script>
import Dashboard from "@/components/Dashboard/index.vue";
import moment from "moment";

export default {
  watchQuery: true,
  middleware: "authenticated",
  components: { Dashboard },
  async asyncData({ store, query }) {
    const startDate = moment()
      .startOf("month")
      .format("DD-MM-YYYY");
    const endDate = moment()
      .endOf("month")
      .format("DD-MM-YYYY");

    if (Object.entries(query).length === 0) {
      query.startDate = startDate;
      query.endDate = endDate;
    }

    // store.commit("dashboardTotal", null);
    // store.commit("sourceDashboard", null);
    // store.commit("categoryDashboard", null);

    store.commit("isLoading", true);
    console.log(query);

    await store
      .dispatch("getDashboardTotal", query)
      .then(() => {
        store.commit("isLoading", false);
      })
      .catch(() => {
        store.commit("isLoading", false);
      });

    await store
      .dispatch("getSourceDashboard", query)
      .then(() => {
        store.commit("isLoading", false);
      })
      .catch(() => {
        store.commit("isLoading", false);
      });

    await store
      .dispatch("getCategoryDashboard", query)
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
      title: "Dashboard - Expense Management"
    };
  }
};
</script>
