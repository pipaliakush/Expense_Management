import { api } from "boot/axios";
import { request } from "src/store/api.js";

export function login({ commit }) {
  return request(api, "get", "/auth/google").then(response => {
    // commit("userData", response);
    console.log(response);
  });
}
