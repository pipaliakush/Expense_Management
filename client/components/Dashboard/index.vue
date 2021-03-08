<template>
  <div>
    <div class="mr-auto">
      Filter by Date&nbsp;
      <date-range-picker
        opens="right"
        :single-date-picker="false"
        :locale-data="localData"
        :showWeekNumbers="true"
        :showDropdowns="true"
        :autoApply="true"
        v-model="dateRange"
        @update="updateValues"
        :ranges="false"
      >
        <!-- <template v-slot:input="picker" style="min-width: 350px">
            {{ picker.startDate | formatDate }} *
            {{ picker.endDate | formatDate }}
          </template> -->
      </date-range-picker>
    </div>
    {{ lineChartExpenseData }}-= {{ lineChartIncomeData }}
    <v-row class="mt-5 mb-5">
      <v-col cols="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Income</div>
              <v-list-item-title class="headline mb-1"
                >₹{{ totalIncome.totalAmount }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-avatar tile>
              <v-icon size="40">
                mdi-finance
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Expenses</div>
              <v-list-item-title class="headline mb-1"
                >₹{{ totalExpense.totalAmount }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-avatar tile>
              <v-icon size="40">
                mdi-poll
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Total Categories</div>
              <v-list-item-title class="headline mb-1">13</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile>
              <v-icon size="40">
                mdi-format-list-bulleted-type
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Number of Sources</div>
              <v-list-item-title class="headline mb-1">5</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile>
              <v-icon size="40">
                mdi-wallet-travel
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-container> -->
    <v-divider></v-divider>
    <v-row class="mt-5 mb-5">
      <v-col cols="12">
        <LineChart
          :expenseDataSet="lineChartExpenseData"
          :incomeDataSet="lineChartIncomeData"
          :height="140"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-5 mb-5">
      <v-col cols="6">
        <DoughnutChart
          :height="250"
          chartTitle="Income wise Categories"
          :chartLabel="categorylabels"
          :channelData="categoryData"
        />
      </v-col>
      <v-col cols="6">
        <DoughnutChart
          :height="250"
          chartTitle="Expense wise Categories"
          :chartLabel="categorylabels"
          :channelData="categoryData"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-5 mb-5">
      <v-col cols="6">
        <DoughnutChart
          :height="250"
          chartTitle="Income wise Sources"
          :chartLabel="sourcelabels"
          :channelData="sourceData"
        />
      </v-col>
      <v-col cols="6">
        <DoughnutChart
          :height="250"
          chartTitle="Expense wise Sources"
          :chartLabel="sourcelabels"
          :channelData="sourceData"
        />
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>

<script>
import DoughnutChart from "@/components/Dashboard/DoughnutChart.vue";
import LineChart from "@/components/Dashboard/LineChart.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";

export default {
  name: "dashboard",
  components: {
    DateRangePicker,
    DoughnutChart,
    LineChart
  },
  data() {
    return {
      categorylabels: [
        "Fuel",
        "Luxury",
        "Music",
        "Investment",
        "Grocery",
        "Health",
        "Food"
      ],
      sourcelabels: ["Cash", "HDFC", "ICICI", "Paytm", "PhonePay"],
      categoryData: [300, 1400, 75, 1900, 400, 350, 300],
      sourceData: [3000, 14000, 7500, 1900, 400],
      dateRange: {
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
      },
      localData: {
        direction: "ltr",
        format: "dd/mm/yyyy",
        separator: " - "
      }
    };
  },
  computed: {
    lineChartExpenseData() {
      return this.$store.getters.dashboardLineChartExpenseData;
    },
    lineChartIncomeData() {
      return this.$store.getters.dashboardLineChartIncomeData;
    },
    totalIncome() {
      return this.$store.getters.totalIncome;
    },
    totalExpense() {
      return this.$store.getters.totalExpense;
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.startDate) {
      let parts = this.$route.query.startDate.split("-");
      this.dateRange.startDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }

    if (this.$route.query && this.$route.query.endDate) {
      let parts = this.$route.query.endDate.split("-");
      this.dateRange.endDate = new Date(parts[2], parts[1] - 1, parts[0]);
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
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() > new Date();
      }
      return classes;
    },
    // getDashboard() {
    //   this.$store
    //     .dispatch("getDashboard", this.$route.query)
    //     .then(() => {})
    //     .catch(() => {});
    // },
    updateValues() {
      const startDate = this.convertISOToFormattedString(
        new Date(this.dateRange.startDate).toISOString()
      );
      const endDate = this.convertISOToFormattedString(
        new Date(this.dateRange.endDate).toISOString()
      );

      const query = Object.assign({}, this.$route.query, {
        startDate,
        endDate
      });
      this.$router.push({ query });
    }
  }
};
</script>

<style>
.daterangepicker .drp-calendar {
  max-width: 265px;
}

.form-control.reportrange-text span,
.form-control.reportrange-text i {
  color: black;
}
.calendar-table tbody :not(.week):not(.disabled) {
  color: black;
}
</style>
