import { request } from "@/store/api.js";
import axios from "axios";

const prefix = "/api/v1";

export default {
  getCategories({ commit }) {
    const url = `${prefix}/category`;
    console.log("-=-=-=-=-=-=");
    return request(axios, "get", url).then(response => {
      commit("categories", response.data);
    });
  }
};
