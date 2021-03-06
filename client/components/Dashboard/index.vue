<template>
  <div>
    <v-row class="mt-5 mb-5">
      <v-col cols="3">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Income</div>
              <v-list-item-title class="headline mb-1"
                >₹9,50,000</v-list-item-title
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
                >₹50,000</v-list-item-title
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
        <LineChart :height="140" />
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

export default {
  name: "dashboard",
  components: {
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
      sourceData: [3000, 14000, 7500, 1900, 400]
    };
  }
};
</script>
