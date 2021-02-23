<template>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Icon
          </th>
          <th class="text-left">
            Default
          </th>
        </tr>
      </thead>
      <tbody v-if="categoriesList.length">
        <tr v-for="item in categoriesList">
          <td>{{ item.name }}</td>
          <td><i :class="item.icon" class="fa-2x" aria-hidden="true"></i></td>
          <td><span v-if="item.isDefault">Yes</span><span v-else>No</span></td>
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
