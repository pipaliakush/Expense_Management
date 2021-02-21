<template>
  <div>Hello {{ $store.state.user }}</div>
</template>

<script>
export default {
  watchQuery: true,
  middleware: "authenticated",
  head() {
    return {
      title: "Dashboard - Expense Management"
    };
  }
};
</script>
