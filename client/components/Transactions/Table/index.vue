<template>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Amount
          </th>
        </tr>
      </thead>
      <tbody v-if="transactionsList.length">
        <tr v-for="item in transactionsList" :key="item._id">
          <td>{{ item.title }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.amount }}</td>
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
  components: {},
  data() {
    return {};
  },
  computed: {
    transactionsList() {
      return this.$store.state.transactionsList;
    }
  },
  methods: {}
};
</script>
