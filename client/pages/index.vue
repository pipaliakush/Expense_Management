<template>
  <div>
    <h1>index</h1>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  components: {
    // Index: () => import("@/components/Index.vue")
  },
  head() {
    return {
      title: "Dashboard"
    };
  },
  async asyncData({ redirect }) {
    await redirect({
      name: "dashboard"
    });
    return {};
  }
};
</script>
