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
    return request(axios, "post", url, postData).then(response => {
      // commit("categories", response.data);
    });
  }
};
