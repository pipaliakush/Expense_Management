<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    chartLabel: {
      type: Array,
      required: true
    },
    channelData: {
      type: Array,
      required: true
    },
    chartTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: this.chartLabel,
        datasets: [
          {
            data: this.channelData,
            backgroundColor: [
              "#17C7DF",
              "#F64A32",
              "#FEA200",
              "#003f5c",
              "#00d48a",
              "#79ff4d",
              "#fc54ff",
              "#7c539d",
              "#F7DC00"
            ],
            hoverBackgroundColor: [
              "#17C7DF",
              "#F64A32",
              "#FEA200",
              "#003f5c",
              "#00d48a",
              "#79ff4d",
              "#fc54ff",
              "#7c539d",
              "#F7DC00"
            ]
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: this.chartTitle,
          fontSize: 20,
          fontColor: "#A1887F"
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
