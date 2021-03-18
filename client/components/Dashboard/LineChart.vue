<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    expenseDataSet: {
      type: Array,
      required: true,
    },
    incomeDataSet: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Income and Expenses based on date",
          fontSize: 18,
          fontColor: "#A1887F",
        },
        scales: {
          xAxes: [
            {
              type: "time",
            },
          ],
        },
        legend: {
          position: "bottom",
          labels: {
            fontSize: 12,
            usePointStyle: true,
          },
        },
      },
    };
  },
  mounted() {
    const chartData = {
      datasets: [
        {
          label: "Income",
          fill: false,
          data: this.incomeDataSet,
          borderColor: "#79ff4d",
          borderWidth: 3,
        },
        {
          label: "Expense",
          fill: false,
          data: this.expenseDataSet,
          borderColor: "#17C7DF",
          borderWidth: 3,
        },
      ],
    };
    this.renderChart(chartData, this.options);
  },
  computed: {
    changeData() {
      const { incomeDataSet, expenseDataSet } = this;
      return {
        incomeDataSet,
        expenseDataSet,
      };
    },
  },
  watch: {
    changeData: {
      handler: function ({ incomeDataSet, expenseDataSet }) {
        const chartData = {
          datasets: [
            {
              label: "Income",
              fill: false,
              data: incomeDataSet,
              borderColor: "#79ff4d",
              borderWidth: 3,
            },
            {
              label: "Expense",
              fill: false,
              data: expenseDataSet,
              borderColor: "#17C7DF",
              borderWidth: 3,
            },
          ],
        };
        this.renderChart(chartData, this.options);
      },
      deep: true,
    },
  },
};
</script>
