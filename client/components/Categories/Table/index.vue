<template>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody v-if="categoriesList.length">
        <tr v-for="item in categoriesList">
          <!-- <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td> -->
        </tr>
      </tbody>
      <div class="m-5 text-center" v-else>
        No Records Found
      </div>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    categoriesList() {
      return this.$store.state.categoriesList;
    }
  }
};
</script>
