import { request } from "@/store/api.js";
import axios from "axios";

const prefix = "/api/v1";

export default {
  //category
  getCategories({ commit }) {
    const url = `${prefix}/category`;
    return request(axios, "get", url).then(response => {
      commit("categories", response.data);
    });
  },
  addCategory({ dispatch }, postData) {
    const url = `${prefix}/category`;
    return request(axios, "post", url, postData).then(response => {});
  },
  updateCategory({ dispatch }, { id, postData }) {
    const url = `${prefix}/category/${id}`;
    return request(axios, "put", url, postData).then(response => {});
  },
  deleteCategory({ dispatch }, id) {
    const url = `${prefix}/category/${id}`;
    return request(axios, "delete", url).then(response => {});
  },

  //sources
  getSources({ commit }) {
    const url = `${prefix}/source`;
    return request(axios, "get", url).then(response => {
      commit("sources", response.data);
    });
  },
  addSource({ dispatch }, postData) {
    const url = `${prefix}/source`;
    return request(axios, "post", url, postData).then(response => {});
  },
  updateSource({ dispatch }, { id, postData }) {
    const url = `${prefix}/source/${id}`;
    return request(axios, "put", url, postData).then(response => {});
  },
  deleteSource({ dispatch }, id) {
    const url = `${prefix}/source/${id}`;
    return request(axios, "delete", url).then(response => {});
  },

  //transactions
  getTransactions({ commit }) {
    const url = `${prefix}/transactions`;
    return request(axios, "get", url).then(response => {
      commit("transactions", response.data);
    });
  },
  getSingleTransaction({ commit }, id) {
    const url = `${prefix}/transaction/${id}`;
    return request(axios, "get", url).then(response => {
      commit("transaction", response.data);
    });
  },
  addTransaction({ dispatch }, postData) {
    const url = `${prefix}/transaction`;
    return request(axios, "post", url, postData).then(response => {});
  },
  updateTransaction({ dispatch }, { id, postData }) {
    const url = `${prefix}/transaction/${id}`;
    return request(axios, "put", url, postData).then(response => {});
  },
  deleteTransaction({ dispatch }, id) {
    const url = `${prefix}/transaction/${id}`;
    return request(axios, "delete", url).then(response => {});
  },
  logout() {
    return request(axios, "post", `${prefix}/auth/logout`);
  },
  getTransactionsByDate({ commit }, queryParam) {
    const url = `${prefix}/transactions`;
    return request(axios, "get", url, queryParam).then(response => {
      const data = response.data;
      const dashboardData = data.reduce((acc, item) => {
        if (acc.lineChart === undefined) {
          acc.lineChart = {};
          acc.lineChart.income = [];
          acc.lineChart.expense = [];
        }

        if (item.type === "income") {
          acc.income = acc.income ? acc.income + item.amount : item.amount;
          acc.lineChart.income.push([item.spentOn, item.amount]);
        } else {
          acc.expense = acc.expense ? acc.expense + item.amount : item.amount;
          acc.lineChart.expense.push([item.spentOn, item.amount]);
        }

        if (acc.catogoryChart === undefined) {
          acc.catogoryChart = {};
        }
        if (acc.catogoryChart[item.categoryId.name] === undefined) {
          acc.catogoryChart[item.categoryId.name] = 0;
        }
        acc.catogoryChart[item.categoryId.name] =
          acc.catogoryChart[item.categoryId.name] + item.amount;

        if (acc.sourceChart === undefined) {
          acc.sourceChart = {};
        }
        if (acc.sourceChart[item.sourceId.name] === undefined) {
          acc.sourceChart[item.sourceId.name] = 0;
        }
        acc.sourceChart[item.sourceId.name] =
          acc.sourceChart[item.sourceId.name] + item.amount;

        return acc;
      }, {});

      commit("dashboard", dashboardData);
    });
  }
};
