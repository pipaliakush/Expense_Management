<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu
        offset-y
        transition="slide-y-transition"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                fab
                dark
                small
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-avatar tar class="cursor-pointer">
                  <img
                    :src="$store.state.user.avatar"
                    :alt="$store.state.user.name"
                  />
                </v-avatar>
              </v-btn>
            </template>
            <span>Profile</span>
          </v-tooltip>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{
                  $store.state.user.name
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-title>Switch Theme</v-list-item-title>
              <v-list-item-action>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  @change="themeChanged"
                  inset
                ></v-switch>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="logout" class="cursor-pointer">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <!-- <v-btn class="mx-2" fab dark small @click="helloclick">
        <v-avatar>
          <img :src="$store.state.user.avatar" alt="user" />
        </v-avatar>
      </v-btn> -->

      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} Expense Management</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import "@/assets/css/adminify.js";

export default {
  beforeMount() {
    this.$vuetify.theme.dark = localStorage.getItem("isDarkTheme") === "true";
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Categories",
          to: "/categories"
        },
        {
          icon: "mdi-currency-usd",
          title: "Sources",
          to: "/sources"
        },
        {
          icon: "mdi-receipt",
          title: "Transactions",
          to: "/transactions"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Expense Management"
    };
  },
  methods: {
    themeChanged() {
      localStorage.setItem("isDarkTheme", this.$vuetify.theme.dark);
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          this.$toasted.error("Failed to logout", {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
        });
    }
  }
};
</script>
