<template>
  <div>
    <q-btn color="primary" label="Primary" @click="login" />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    login() {
      console.log("login method called");
      this.$store
        .dispatch("example/login")
        .then(() => {
          console.log("successfully login");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
