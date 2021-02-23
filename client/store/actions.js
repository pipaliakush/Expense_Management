import { request } from "@/store/api.js";
import axios from "axios";

const prefix = "/api/v1";

export default {
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
  }
};
