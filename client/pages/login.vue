<template>
  <div>
    <v-btn depressed color="dark" @click="loginWithGoogle">
      Sign in with Google
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: "login",
  middleware: "notAuthenticated",
  asyncData({ env }) {
    return { env };
  },
  head() {
    return {
      title: "Login - Expense Management",
    };
  },
  mounted() {
    this.$store.dispatch("login");
    //   .then(() => {})
    //   .catch(() => {});
  },
  methods: {
    loginWithGoogle() {
      // window.open("http://localhost:3001/api/v1/auth/google", _self);
      // window.location.href = "http://localhost:3001/api/v1/auth/google";
      window.location.replace("http://localhost:3001/api/v1/auth/google");
      // this.$store
      //   .dispatch("login")
      //   .then(() => {})
      //   .catch(() => {});
    },
  },
};
</script>
