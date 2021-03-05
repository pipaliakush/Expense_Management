<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {},
  data() {
    return {
      chartData: {
        // labels: [
        //   "2015-02-11T13:03:00Z",
        //   "2015-03-19T13:02:00Z",
        //   "2015-04-29T14:12:00Z"
        // ],
        datasets: [
          {
            label: "Income",
            fill: false,
            data: [
              {
                t: "2021-01-11T13:03:00Z",
                y: 12
              },
              {
                t: "2021-02-19T13:02:00Z",
                y: 3
              },
              {
                t: "2021-02-28T14:12:00Z",
                y: 32
              },
              {
                t: "2021-03-02T14:12:00Z",
                y: 20
              }
            ],
            borderColor: "#79ff4d",
            borderWidth: 3
          },
          {
            label: "Expense",
            fill: false,
            data: [
              {
                t: "2021-01-11T13:03:00Z",
                y: 12
              },
              {
                t: "2021-02-15T13:02:00Z",
                y: 45
              },
              {
                t: "2021-02-25T14:12:00Z",
                y: 5
              },
              {
                t: "2021-03-04T14:12:00Z",
                y: 50
              }
            ],
            borderColor: "#17C7DF",
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Income and Expenses based on date",
          fontSize: 18,
          fontColor: "#A1887F"
        },
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ]
        },
        legend: {
          position: "bottom",
          labels: {
            fontSize: 12,
            usePointStyle: true
          }
        }
        // tooltips: {
        //   callbacks: {
        //     label: function(tooltipItem, data) {
        //       const dataset = data.datasets[tooltipItem.datasetIndex];
        //       const total = dataset.data
        //         .map(v => parseInt(v, 10))
        //         .reduce((previousValue, currentValue) => {
        //           return previousValue + currentValue;
        //         });
        //       const currentValue = dataset.data[tooltipItem.index];
        //       const precentage = ((currentValue * 100) / total).toFixed(2);
        //       return (
        //         data.labels[tooltipItem.index] +
        //         ": " +
        //         dataset.data[tooltipItem.index] +
        //         " " +
        //         "(" +
        //         precentage +
        //         "%)"
        //       );
        //     }
        //   }
        // }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
