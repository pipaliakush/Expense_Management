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
      }
    };
  },
  computed: {
    changeData() {
      const { chartLabel, channelData, chartTitle } = this;
      return {
        chartLabel,
        channelData,
        chartTitle
      };
    },
  },
   watch: {
    changeData: {
      handler: function ({ chartLabel, channelData }) {
        const chartData = {
          labels: chartLabel,
          datasets: [
            {
              data: channelData,
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
        };
        this.renderChart(chartData, this.options);
      },
      deep: true,
    },
  },
  mounted() {
    const chartData = {
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
    };
    this.renderChart(chartData, this.options);
  }
};
</script>
