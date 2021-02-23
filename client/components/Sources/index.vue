<template>
  <div>
    <div class="mt-2 d-flex flex-row-reverse">
      <Create />
    </div>

    <Table />
  </div>
</template>

<script>
import Table from "@/components/Sources/Table/index.vue";
import Create from "@/components/Sources/Create/index.vue";

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
