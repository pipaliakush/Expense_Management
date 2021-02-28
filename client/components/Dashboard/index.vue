<template>
  <div>
    <span>
      Select date range :
      <date-range-picker
        opens="right"
        single-date-picker="range"
        :locale-data="localData"
        :showWeekNumbers="true"
        :showDropdowns="true"
        :autoApply="true"
        v-model="dateRange"
        @update="updateValues"
        :ranges="ranges"
        :date-format="dateFormat"
      >
        <!-- <template v-slot:input="picker" style="min-width: 350px">
          {{ picker.startDate | formatDate }} *
          {{ picker.endDate | formatDate }}
        </template> -->
      </date-range-picker>
    </span>
    <div class="d-flex flex-row justify-space-around align-center">
      <div>Income: {{ income }}</div>
      <div>Expense: {{ expense }}</div>
    </div>
    <div class="d-flex flex-row justify-space-around align-center">
      <div class="chart">
        <chart :options="chartOptions"></chart>
      </div>
      <div class="chart">
        <chart :options="categoryChartOptions"></chart>
      </div>
      <div class="chart">
        <chart :options="sourceChartOptions"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
import { Chart } from "highcharts-vue";

export default {
  data() {
    return {
      income: 0,
      expense: 0,
      dateRange: {
        startDate: moment(),
        endDate: moment(),
      },
      ranges: {
        // default value for ranges object (if you set this to false ranges will no be rendered)
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "This month": [moment().startOf("month"), moment().endOf("month")],
        "This year": [moment().startOf("year"), moment().endOf("year")],
        "Last week": [
          moment().subtract(1, "week").startOf("week"),
          moment().subtract(1, "week").endOf("week"),
        ],
        "Last month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
      localData: {
        direction: "ltr",
        format: "dd/mm/yyyy",
        separator: " - ",
      },
      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
        credits: {
          enabled: false,
        },
      },
      categoryChartOptions: {
        chart: {
          type: "pie",
        },
        series: [
          {
            name: "Category",
            data: [{ name: "No Transaction", y: 1 }], // sample data
          },
        ],
        credits: {
          enabled: false,
        },
      },
      sourceChartOptions: {
        chart: {
          type: "pie",
        },
        series: [
          {
            name: "Source",
            data: [{ name: "No Transaction", y: 1 }], // sample data
          },
        ],
        credits: {
          enabled: false,
        },
      },
    };
  },
  methods: {
    updateValues() {
      const startDate = new Date(this.dateRange.startDate).toISOString();
      const endDate = new Date(this.dateRange.endDate).toISOString();
      this.$store
        .dispatch("getTransactionsByDate", { startDate, endDate })
        .then(() => {
          this.income = this.$store.state.dashboard.income;
          this.expense = this.$store.state.dashboard.expense;
          const categoryChartOptions = this.getChartOptions(
            this.$store.state.dashboard.catogoryChart
          );
          const sourceChartOptions = this.getChartOptions(
            this.$store.state.dashboard.sourceChart
          );
          this.categoryChartOptions = categoryChartOptions;
          this.sourceChartOptions = sourceChartOptions;
        });
    },
    getChartOptions(chartData) {
      const chartSeriesData = [];
      Object.keys(chartData).map((name) => {
        chartSeriesData.push({
          name: name,
          y: chartData[name],
        });
      });
      return {
        chart: {
          type: "pie",
        },
        series: [
          {
            name: "Amount",
            data: chartSeriesData, // sample data
          },
        ],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        credits: {
          enabled: false,
        },
      };
    },
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() > new Date();
      }
      return classes;
    },
  },
  computed: {
    // income() {
    //   if (this.$store.state.dashboard) {
    //     return this.$store.state.dashboard.income;
    //   } else {
    //     return 0;
    //   }
    // },
    // expense() {
    //   if (this.$store.state.dashboard) {
    //     return this.$store.state.dashboard.expense;
    //   } else {
    //     return 0;
    //   }
    // },
  },
  components: { DateRangePicker, Chart },
};
</script>

<style>
.chart {
  width: 250px;
  height: 200px;
}

.daterangepicker .drp-calendar {
  max-width: 265px;
}
/* .form-control.reportrange-text span,
.form-control.reportrange-text i {
  color: black;
}

.calendar-table tbody :not(.week):not(.disabled) {
  color: black;
} */
</style>
