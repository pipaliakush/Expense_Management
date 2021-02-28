<template>
  <div>
    <div class="mt-3 d-flex">
      <div class="mr-auto">
        Filter by Date&nbsp;
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

    <!-- <Table /> -->
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
      !["all", "expenses", "incomes"].includes(this.$route.query.filterBy)
    ) {
      this.$router.push({ query: { filterBy: "all" } });
      this.selectedFilter = "all";
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
        { label: "Expenses", value: "expenses" },
        { label: "Incomes", value: "incomes" }
      ],
      dateRange: {
        startDate: moment(),
        endDate: moment()
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
    dateFormat(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() > new Date();
      }
      return classes;
    },
    filterSelected() {
      this.$router.push({ query: { filterBy: this.selectedFilter } });
    },
    getTransactions() {
      this.$store
        .dispatch("getTransactions", this.$route.query)
        .then(() => {})
        .catch(() => {});
    },
    updateValues() {
      const startDate = new Date(this.dateRange.startDate).toISOString();
      const endDate = new Date(this.dateRange.endDate).toISOString();
      console.log(startDate);
      console.log(endDate);
    }
  }
};
</script>

<style scoped>
.daterangepicker .drp-calendar {
  max-width: 265px;
}
</style>
