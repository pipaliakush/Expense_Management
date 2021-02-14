<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <!-- Quasar App -->
        </q-toolbar-title>

        <!-- Account Settings -->
        <div>
          <div class="q-pa-md">
            <q-btn round>
              <q-avatar size="42px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Settings</div>
                    <q-toggle v-model="mobileData" label="Use Mobile Data" />
                    <q-toggle v-model="bluetooth" label="Bluetooth" />
                  </div>

                  <q-separator vertical inset class="q-mx-lg" />

                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                    <q-btn
                      color="primary"
                      label="Logout"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <!-- Account Settings -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import LinksData from "src/layouts/sidebarRoutes.json";

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      mobileData: false,
      bluetooth: true,
      leftDrawerOpen: false,
      essentialLinks: LinksData.routes
    };
  }
};
</script>
