import Vue from 'vue';
import jwt_decode from "jwt-decode";

export default function({ redirect, store }) {

  const authDetails = Vue.$cookies.get('auth');

  // If the user is not authenticated
  if (!authDetails) {
    return redirect("/login");
  }

  if (!store.state.user) {
    try {
      const tokenData = jwt_decode(authDetails, { header: true });
      store.commit('setUser', tokenData.passport.user);
    } catch (error) {
      return redirect("/login");
    }
  }
}
