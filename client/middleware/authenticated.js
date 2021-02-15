import state from "@/store/state.js";

export default function({ store, redirect, route, env }) {
  let r_url;

  if (process.server) {
    r_url = route.fullPath;
  } else if (process.client) {
    r_url = window.location.href
      .replace(window.location.origin, "")
      .replace(env.base, "");
  }

  // If the user is not authenticated
  if (!store.state.user) {
    store.commit("resetState", state);
    return redirect("/login", { r_url });
  }
}
