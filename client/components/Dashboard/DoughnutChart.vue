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
                "#F7DC00",
                "#EF5350",
                "#C2185B",
                "#E040FB",
                "#E1BEE7",
                "#42A5F5",
                "#FF3D00",
                "#6D4C41",
                "#78909C",
                "#FF5722",
                "#FFAB00",
                "#76FF03",
                "#9E9D24",
                "#66BB6A",
                "#00BFA5",
                "#00B0FF",
                "#004D40"
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
                "#F7DC00",
                "#EF5350",
                "#C2185B",
                "#E040FB",
                "#E1BEE7",
                "#42A5F5",
                "#FF3D00",
                "#6D4C41",
                "#78909C",
                "#FF5722",
                "#FFAB00",
                "#76FF03",
                "#9E9D24",
                "#66BB6A",
                "#00BFA5",
                "#00B0FF",
                "#004D40"
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
            "#F7DC00",
            "#EF5350",
            "#C2185B",
            "#E040FB",
            "#E1BEE7",
            "#42A5F5",
            "#FF3D00",
            "#6D4C41",
            "#78909C",
            "#FF5722",
            "#FFAB00",
            "#76FF03",
            "#9E9D24",
            "#66BB6A",
            "#00BFA5",
            "#00B0FF",
            "#004D40"
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
            "#F7DC00",
            "#EF5350",
            "#C2185B",
            "#E040FB",
            "#E1BEE7",
            "#42A5F5",
            "#FF3D00",
            "#6D4C41",
            "#78909C",
            "#FF5722",
            "#FFAB00",
            "#76FF03",
            "#9E9D24",
            "#66BB6A",
            "#00BFA5",
            "#00B0FF",
            "#004D40"
          ]
        }
      ]
    };
    this.renderChart(chartData, this.options);
  }
};
</script>
