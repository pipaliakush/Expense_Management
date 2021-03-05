<template>
  <div>
    <span class="date-picker">
      Filter by Date&nbsp;
      <date-range-picker
        opens="right"
        :always-show-calendars="false"
        :single-date-picker="false"
        :locale-data="localData"
        :showWeekNumbers="true"
        :showDropdowns="true"
        :autoApply="true"
        v-model="dateRange"
        @update="updateValues"
        :ranges="ranges"
        :date-format="dateFormat"
      >
      </date-range-picker>
    </span>
    <div class="d-flex flex-column amount-details">
      <div class="d-flex flex-row justify-space-around align-center header">
        <div class="">Income</div>
        <div class="">Expense</div>
      </div>
      <div
        class="d-flex flex-row justify-space-around align-center income-expense"
      >
        <div class="income right-line">{{ income }}</div>
        <div class="expense left-line">{{ expense }}</div>
      </div>
    </div>
    <div class="d-flex flex-column justify-space-around align-center">
      <v-col>
        <v-card elevation="4" class="rounded-card">
          <chart :options="lineChartOptions"></chart>
        </v-card>
      </v-col>
      <v-container class="d-flex flex-row">
        <v-row>
          <v-col>
            <v-card elevation="4" class="rounded-card">
              <chart :options="categoryChartIncomeOptions"></chart>
            </v-card>
          </v-col>
          <v-col>
            <v-card elevation="4" class="rounded-card">
              <chart :options="categoryChartExpenseOptions"></chart>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="d-flex flex-row">
        <v-row>
          <v-col>
            <v-card elevation="4" class="rounded-card">
              <chart :options="sourceChartIncomeOptions"></chart>
            </v-card>
          </v-col>
          <v-col>
            <v-card elevation="4" class="rounded-card">
              <chart :options="sourceChartExpenseOptions"></chart>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
        startDate: moment().subtract(1, "month"),
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
        customRangeLabel: "Custom Range",
      },
      lineChartOptions: {
        series: [
          {
            data: [],
          },
        ],
        credits: {
          enabled: false,
        },
      },
      categoryChartIncomeOptions: this.getDefaultPieChartOptions(
        "Catagories of Incomes",
        "Category"
      ),
      categoryChartExpenseOptions: this.getDefaultPieChartOptions(
        "Catagories of Expenses",
        "Category"
      ),
      sourceChartIncomeOptions: this.getDefaultPieChartOptions(
        "Sources of Incomes",
        "Source"
      ),
      sourceChartExpenseOptions: this.getDefaultPieChartOptions(
        "Sources of Expenses",
        "Source"
      ),
    };
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    convertISOToFormattedString: function (isoDate) {
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
    updateValues() {
      const startDate = this.convertISOToFormattedString(
        new Date(this.dateRange.startDate).toISOString()
      );
      const endDate = this.convertISOToFormattedString(
        new Date(this.dateRange.endDate).toISOString()
      );
      this.$store
        .dispatch("getDashboardData", { startDate, endDate })
        .then((response) => {
          const data = response.data;
          const dashboardData = data.reduce((acc, item) => {
            if (acc.lineChart === undefined) {
              acc.lineChart = {};
              acc.lineChart.income = [];
              acc.lineChart.expense = [];
            }

            if (item.type === "income") {
              acc.income = acc.income ? acc.income + item.amount : item.amount;
              acc.lineChart.income.push([
                new Date(item.spentOn).getTime(),
                item.amount,
              ]);
            } else {
              acc.expense = acc.expense
                ? acc.expense + item.amount
                : item.amount;
              acc.lineChart.expense.push([
                new Date(item.spentOn).getTime(),
                item.amount,
              ]);
            }

            if (acc.catogoryChart === undefined) {
              acc.catogoryChart = {};
            }
            if (acc.catogoryChart[item.type] === undefined) {
              acc.catogoryChart[item.type] = {};
            }
            if (
              acc.catogoryChart[item.type][item.categoryId.name] === undefined
            ) {
              acc.catogoryChart[item.type][item.categoryId.name] = 0;
            }
            acc.catogoryChart[item.type][item.categoryId.name] =
              acc.catogoryChart[item.type][item.categoryId.name] + item.amount;

            if (acc.sourceChart === undefined) {
              acc.sourceChart = {};
            }
            if (acc.sourceChart[item.type] === undefined) {
              acc.sourceChart[item.type] = {};
            }
            if (acc.sourceChart[item.type][item.sourceId.name] === undefined) {
              acc.sourceChart[item.type][item.sourceId.name] = 0;
            }
            acc.sourceChart[item.type][item.sourceId.name] =
              acc.sourceChart[item.type][item.sourceId.name] + item.amount;

            return acc;
          }, {});

          this.income = dashboardData.income || 0;
          this.expense = dashboardData.expense || 0;
          const categoryChartIncomeOptions = this.getChartOptions(
            dashboardData.catogoryChart.income
          );
          const categoryChartExpenseOptions = this.getChartOptions(
            dashboardData.catogoryChart.expense
          );
          const sourceChartIncomeOptions = this.getChartOptions(
            dashboardData.sourceChart.income
          );
          const sourceChartExpenseOptions = this.getChartOptions(
            dashboardData.sourceChart.expense
          );
          const lineChartOptions = this.getLineChartOptions(
            dashboardData.lineChart
          );
          this.categoryChartIncomeOptions = categoryChartIncomeOptions;
          this.categoryChartExpenseOptions = categoryChartExpenseOptions;
          this.sourceChartIncomeOptions = sourceChartIncomeOptions;
          this.sourceChartExpenseOptions = sourceChartExpenseOptions;
          this.lineChartOptions = lineChartOptions;
        });
    },
    getDefaultPieChartOptions(title, seriesName) {
      return {
        chart: {
          type: "pie",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
        },
        title: {
          text: title,
        },
        series: [
          {
            name: seriesName,
            data: [{ name: "No Transaction", y: 1 }],
          },
        ],
        credits: {
          enabled: false,
        },
      };
    },
    getLineChartOptions({ income, expense }) {
      console.log(income, expense);
      return {
        chart: {
          type: "line",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
        },
        xAxis: {
          type: "datetime",
          title: {
            text: "Date",
          },
        },
        title: {
          text: "Income vs Expense",
        },
        series: [
          {
            name: "Income",
            data: income,
          },
          {
            name: "Expense",
            data: expense,
          },
        ],
        credits: {
          enabled: false,
        },
      };
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
  components: { DateRangePicker, Chart },
};
</script>

<style >
.chart {
  width: 250px;
  height: 200px;
}

.rounded-card {
  border-radius: 12px !important;
}

.daterangepicker .drp-calendar {
  max-width: 265px;
}

.date-picker {
  margin-left: 12px;
}

.amount-details {
  border-radius: 8px;
  margin: 30px 12px 30px 12px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
}

.amount-details .header {
  background-color: rgba(0, 0, 0, 0.04);

  border: 0px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px 8px 0px 0px;
}

.income,
.expense {
  font-size: 22px;
  flex: 1;
  background-color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.right-line {
  border-right: 2px solid rgba(0, 0, 0, 0.04);
  border-bottom-left-radius: 8px;
}

.left-line {
  border-left: 2px solid rgba(0, 0, 0, 0.04);
  border-bottom-right-radius: 8px;
}

.income-expense {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
