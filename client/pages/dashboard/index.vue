<template>
  <Dashboard />
</template>

<script>
import Dashboard from "@/components/Dashboard/index.vue";

export default {
  watchQuery: true,
  middleware: "authenticated",
  components: { Dashboard },
  head() {
    return {
      title: "Dashboard - Expense Management"
    };
  }
};
</script>
