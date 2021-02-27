<template>
  <div>
    <div class="mt-2 d-flex flex-row-reverse">
      <Create />
    </div>

    <Table />
  </div>
</template>

<script>
import Create from "@/components/Transactions/Create/index.vue";
import Table from "@/components/Transactions/Table/index.vue";

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
