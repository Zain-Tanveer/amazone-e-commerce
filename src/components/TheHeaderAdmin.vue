<template>
  <v-app-bar color="primary" app height="76">
    <v-app-bar-nav-icon dark @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>

    <v-container fluid class="d-flex align-center justify-space-between">
      <!-- application title -->
      <v-toolbar-title class="font-weight-black text-h5">
        <router-link :to="{ name: 'admin' }" tag="a" class="white--text text-decoration-none">
          Amazone Admin
        </router-link>
      </v-toolbar-title>

      <!-- login, register, user and cart -->
      <div>
        <!-- login and register -->
        <template v-if="!getToken && getUser.role !== 'admin'">
          <router-link :to="{ name: 'login' }">
            <v-btn text class="white--text"> <v-icon left dense>mdi-account</v-icon> Login </v-btn>
          </router-link>
          <v-btn text class="white--text"> Register </v-btn>
        </template>

        <!-- user -->
        <template v-if="getToken && getUser.role === 'admin'">
          <v-menu offset-y left elevation="5">
            <template v-slot:activator="{ attrs, on }">
              <v-btn text class="white--text" v-bind="attrs" v-on="on">
                <v-icon left dense>mdi-account</v-icon> {{ getUser.username }}
              </v-btn>
            </template>

            <v-list dense width="200">
              <v-list-item v-for="item in userLinks" :key="item.text" :to="{ name: item.slug }">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="handleLogout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheHeaderAdmin",

  data() {
    return {
      userLinks: [{ icon: "mdi-account-cog", text: "Admin Panel", slug: "admin" }],
    };
  },

  computed: {
    ...mapGetters(["getUser", "getToken"]),
  },

  methods: {
    ...mapActions(["logoutUser"]),

    /**
     * Function to handle click of logout button.
     *
     * @param {none}
     * @returns {void}
     */
    async handleLogout() {
      await this.logoutUser();

      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped></style>
