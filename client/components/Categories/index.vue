<template>
  <div>
    <div class="mt-2 d-flex flex-row-reverse">
      <Create />
    </div>

    <Table />
  </div>
</template>

<script>
import Table from "@/components/Categories/Table/index.vue";
import Create from "@/components/Categories/Create/index.vue";

export default {
  components: {
    Create,
    Table
  },
  data() {
    return {};
  }
};
</script>
