<template>
  <div>
    <div class="mt-3 d-flex">
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
          :date-format="dateFormat"
        >
          <!-- <template v-slot:input="picker" style="min-width: 350px">
            {{ picker.startDate | formatDate }} *
            {{ picker.endDate | formatDate }}
          </template> -->
        </date-range-picker>
      </div>
      <div class="mr-5">
        <v-select
          v-model="selectedFilter"
          :items="filters"
          item-text="label"
          item-value="value"
          label="Filter by Type"
          dense
          outlined
          @change="filterSelected"
        ></v-select>
      </div>

      <Create />
    </div>

    <Table />
  </div>
</template>

<script>
import Create from "@/components/Transactions/Create/index.vue";
import Table from "@/components/Transactions/Table/index.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
export default {
  components: {
    Create,
    DateRangePicker,
    Table
  },
  watch: {
    "$route.query": function() {
      // this.$route.query.filterBy = this.selectedFilter;
    }
  },
  mounted() {
    if (
      this.$route.query &&
      !["all", "expense", "income"].includes(this.$route.query.filterBy)
    ) {
      this.$router.push({ query: { filterBy: "all" } });
      this.selectedFilter = "all";
    }

    if (this.$route.query && this.$route.query.startDate) {
      let parts = this.$route.query.startDate.split("-");
      this.dateRange.startDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }

    if (this.$route.query && this.$route.query.endDate) {
      let parts = this.$route.query.endDate.split("-");
      this.dateRange.endDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
  },
  data() {
    return {
      selectedFilter:
        this.$route.query && this.$route.query.filterBy
          ? this.$route.query.filterBy
          : "all",
      filters: [
        { label: "All Transactions", value: "all" },
        { label: "Expenses", value: "expense" },
        { label: "Incomes", value: "income" }
      ],
      dateRange: {
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
      },
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "This month": [moment().startOf("month"), moment().endOf("month")],
        "This year": [moment().startOf("year"), moment().endOf("year")],
        "Last week": [
          moment()
            .subtract(1, "week")
            .startOf("week"),
          moment()
            .subtract(1, "week")
            .endOf("week")
        ],
        "Last month": [
          moment()
            .subtract(1, "month")
            .startOf("month"),
          moment()
            .subtract(1, "month")
            .endOf("month")
        ]
      },
      localData: {
        direction: "ltr",
        format: "dd/mm/yyyy",
        separator: " - "
      }
    };
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
    filterSelected() {
      const query = Object.assign({}, this.$route.query, {
        filterBy: this.selectedFilter
      });
      this.$router.push({ query });
    },
    getTransactions() {
      this.$store
        .dispatch("getTransactions", this.$route.query)
        .then(() => {})
        .catch(() => {});
    },
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

<style scoped>
.daterangepicker .drp-calendar {
  max-width: 265px;
}
</style>
