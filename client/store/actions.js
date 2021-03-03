import { request } from "@/store/api.js";
import axios from "axios";

import { generateQueryForTransaction } from "@/static/static/app.js";

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

  getTransactions({ commit }, { filterBy, startDate, endDate }) {
    const queryString = generateQueryForTransaction({
      filterBy,
      startDate,
      endDate
    });

    const url = `${prefix}/transactions?${queryString}`;
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
  getDashboardData({ commit }, queryParam) {
    const url = `${prefix}/transactions`;
    return request(axios, "get", url, queryParam);
  }
};
