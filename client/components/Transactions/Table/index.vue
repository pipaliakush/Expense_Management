<template>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">
            Title
          </th>
          <th class="text-center">
            Type
          </th>
          <th class="text-center">
            Amount
          </th>
          <th class="text-center">
            Payment Type
          </th>
          <th class="text-center">
            Spent On
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="transactionsList && transactionsList.length">
        <tr v-for="item in transactionsList" :key="item._id">
          <td>
            <i
              :class="item.categoryId.icon"
              class="fa-2x"
              aria-hidden="true"
            ></i>
          </td>
          <td class="text-left">{{ item.title }}</td>
          <td class="text-center">
            <span v-if="item.type == 'expense'">
              <v-chip class="ma-2" small color="primary">
                {{ item.type }}
              </v-chip>
            </span>
            <span v-if="item.type == 'income'">
              <v-chip class="ma-2" small color="success">
                {{ item.type }}
              </v-chip>
            </span>
          </td>
          <td class="text-center">
            <i class="fa fa-inr" aria-hidden="true"></i> {{ item.amount }}
          </td>
          <td class="text-center">
            <span>
              <i
                v-if="item.sourceId.type == 'Cash'"
                class="fa fa-money"
                aria-hidden="true"
              ></i>
              <i
                v-if="item.sourceId.type == 'Bank'"
                class="fa fa-university"
                aria-hidden="true"
              ></i>
              <i
                v-if="item.sourceId.type == 'Wallet'"
                class="fa fa-google-wallet"
                aria-hidden="true"
              ></i>
              <i
                v-if="item.sourceId.type == 'Credit Card'"
                class="fa fa-credit-card-alt"
                aria-hidden="true"
              ></i>
            </span>
            <span>
              {{ item.sourceId.name }}
            </span>
          </td>
          <td class="text-center">
            {{ convertISOToFormattedString(item.spentOn) }}
          </td>
          <td class="d-flex text-center align-center">
            <Edit :formData="item" />
            <div class="ml-2">
              <v-btn
                x-small
                color="error"
                dark
                @click="deleteTransaction(item._id)"
              >
                Delete
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">
            No Records Found
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Edit from "@/components/Transactions/Edit/index.vue";

export default {
  components: { Edit },
  data() {
    return {};
  },
  computed: {
    transactionsList() {
      return this.$store.state.transactionsList;
    }
  },
  methods: {
    convertISOToFormattedString: function(isoDate) {
      let date = new Date(isoDate);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      let formattedDate = dt + "-" + month + "-" + year;
      return formattedDate;
    },
    deleteTransaction(id) {
      this.$store
        .dispatch("deleteTransaction", id)
        .then(() => {
          this.$toasted.success("Transaction deleted successfully", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });

          this.$store
            .dispatch("getTransactions", this.$route.query)
            .then(() => {})
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
