<template>
  <div>
    <div class="mt-2 d-flex flex-row-reverse">
      <Create />
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            small
            class="mx-2"
            fab
            dark
            color="indigo"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <span>Create Category</span>
      </v-tooltip> -->
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
