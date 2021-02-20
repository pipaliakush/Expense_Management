import { request } from "@/store/api.js";
import axios from "axios";

const prefix = "/api/v1";

export default {
  login({ commit }) {
    const url = `${prefix}/auth/login`;
    return request(axios, "get", url).then(response => {
      console.log(response, "=========");
      // commit("userData", response);
    });
  }
};
