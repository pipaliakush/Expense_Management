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
  asyncData({ env }) {
    return { env };
  },
  head() {
    return {
      title: "Login - Expense Management",
    };
  },
  methods: {
    loginWithGoogle() {
      window.location.replace("http://localhost:3001/api/v1/auth/google");
    },
  },
};
</script>
