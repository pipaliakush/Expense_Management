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
  head() {
    return {
      title: "Categories - Expense Management"
    };
  }
};
</script>
