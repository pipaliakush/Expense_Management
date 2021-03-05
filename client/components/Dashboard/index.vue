<template>
  <div>
    <v-row class="mt-5 mb-5">
      <v-col cols="6">
        <v-card elevation="8">
          <p class="pa-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            architecto magni animi praesentium id impedit explicabo eos ullam,
            vero esse doloremque ipsam asperiores libero porro sit assumenda
            quae temporibus totam!
          </p>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card elevation="8">
          <p class="pa-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
            excepturi molestias repudiandae natus eius perferendis tempora
            ratione maxime, officia voluptate consequuntur quos iste deserunt
            quaerat! Unde est sit cum iure!
          </p>
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
