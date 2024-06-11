<template>
  <v-navigation-drawer
    class="elevation-1"
    :value="value"
    @input="$emit('input', $event)"
    width="270"
    app
  >
    <!-- user information -->
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="getUser.image" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ getUser.firstName }} {{ getUser.lastName }}</v-list-item-title>
          <v-list-item-subtitle>{{ getUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider class="mx-2"></v-divider>

    <v-list>
      <!-- dashboard -->
      <v-list-item :to="{ name: 'admin' }" exact>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- products -->
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <!-- product child items -->
        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="{ name: child.slug }"
          exact
          dense
        >
          <v-list-item-icon>
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <!-- other items -->
      <v-list-item v-for="item in otherItems" :key="item.title" :to="{ name: item.slug }" exact>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="primary" block @click="handleLogout"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  inheritAttrs: false,

  name: "TheSidebarAdmin",

  props: {
    value: {
      required: true,
    },
  },

  data() {
    return {
      otherItems: [
        { title: "Users", icon: "mdi-account-multiple", slug: "admin-users" },
        { title: "Account", icon: "mdi-account-box", slug: "admin-account" },
      ],

      items: [
        {
          title: "Products",
          icon: "mdi-package-variant",
          active: false,
          items: [
            { title: "All Products", icon: "mdi-list-box", slug: "admin-products" },
            {
              title: "Create Product",
              icon: "mdi-package-variant-plus",
              slug: "admin-products-create",
            },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["getUser"]),
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

<style></style>
