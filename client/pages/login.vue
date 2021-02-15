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
      title: "Login - Expense Management"
    };
  },
  methods: {
    loginWithGoogle() {
      this.$store
        .dispatch("login")
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>
