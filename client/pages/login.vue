<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-row>
                <v-col cols="12" md="8" class="grey darken-3">
                  <v-card-text class="white--text mt-8">
                    <h1 class="text-center display-1 mb-4">
                      Expense Management
                    </h1>
                    <h5 class="text-center">
                      Start journay with us
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <p>
                      Nowadays, we have lots of works and expense to fulfill our
                      requirements. Here, you can easily store your details and
                      you can get data with awesome charts. It's easy to use and
                      it will save your time because we know nowadays time is
                      very important and we care about you. So, join us and
                      start your journey with us.
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="grey darken-4">
                  <v-card-text class="mt-1">
                    <div class="text-center mt-4">
                      <img
                        src="@/assets/images/google_logo.png"
                        alt="google-logo"
                        height="100"
                        width="100"
                      />
                    </div>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn depressed color="primary" @click="loginWithGoogle">
                      Sign In with Google
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "login",
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
      window.location.replace("http://localhost:3001/api/v1/auth/google");
    }
  }
};
</script>
