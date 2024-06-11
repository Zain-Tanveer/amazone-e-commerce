<template>
  <v-app-bar color="primary" app height="76">
    <v-container class="d-flex align-center justify-space-between">
      <!-- application title -->
      <v-toolbar-title class="font-weight-black text-h5">
        <router-link :to="{ name: 'home' }" tag="a" class="white--text text-decoration-none">
          Amazone
        </router-link>
      </v-toolbar-title>

      <!-- search bar -->
      <v-autocomplete
        v-model="selected"
        :loading="loading"
        :items="products"
        :search-input.sync="keyword"
        item-text="description"
        item-value="id"
        label="Search in Amazone"
        class="search-bar mx-4"
        hide-details
        flat
        solo
        @click="resetData"
        @blur="resetData"
      >
        <!-- search icon -->
        <v-btn class="rounded" icon slot="append" @click="handleSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- no data found -->
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title> No <strong>products</strong> found. </v-list-item-title>
          </v-list-item>
        </template>

        <template #selection></template>

        <!-- product item -->
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            class="text-h5 font-weight-light white--text"
            @click="showProductDetails(item)"
          >
            <img :src="item.thumbnail" />
          </v-list-item-avatar>
          <v-list-item-content @click="showProductDetails(item)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>

      <!-- login, register, user and cart -->
      <div>
        <!-- login and register -->
        <template v-if="!getToken">
          <router-link :to="{ name: 'login' }">
            <v-btn text class="white--text"> <v-icon left dense>mdi-account</v-icon> Login </v-btn>
          </router-link>
          <v-btn text class="white--text"> Register </v-btn>
        </template>

        <!-- user -->
        <template v-if="getToken">
          <v-menu offset-y auto elevation="5">
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

        <!-- cart icon -->
        <v-btn text class="white--text rounded-xxl py-6" v-if="getToken" @click="handleCartClick">
          <v-badge color="white primary--text" :content="getTotalQuantity" offset-y="10">
            <v-icon large>mdi-cart</v-icon>
          </v-badge>
        </v-btn>

        <v-btn
          text
          class="white--text rounded-xxl py-6"
          v-if="!getToken"
          @click="showDialog = true"
        >
          <v-icon v-if="!getToken" large>mdi-cart</v-icon>
        </v-btn>
      </div>
    </v-container>
    <not-logged-in-dialog v-model="showDialog" @close-dialog="showDialog = false" />
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import _ from "lodash";

import API from "@/services/API.js";

export default {
  name: "TheHeader",

  components: {
    NotLoggedInDialog: () => import("@/components/common/NotLoggedInDialog.vue"),
  },

  /**
   * 'created' lifecycle hook used authenticate user,
   * and create debounceGetProducts
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    this.validateUser();
    this.debounceGetProducts = _.debounce(this.getProducts, 500);
  },

  data() {
    return {
      products: [],
      loading: false,
      keyword: null,
      selected: [],
      showDialog: false,

      userLinks: [{ icon: "mdi-cart-variant", text: "View Cart", slug: "cart" }],
    };
  },

  watch: {
    /**
     * watcher to track changes for 'keyword' typed in search bar
     *
     * @param {none}
     * @returns {void}
     */
    keyword() {
      this.debounceGetProducts();
    },

    /**
     * watcher to track changes for 'keyword' typed in search bar
     *
     * @param {none}
     * @returns {void}
     */
    getUser: {
      handler(newVal) {
        if (newVal.role === "admin" && !this.userLinks[1]) {
          this.userLinks.push({ icon: "mdi-account-cog", text: "Admin Panel", slug: "admin" });
        } else if (newVal.role !== "admin" && this.userLinks[1]) {
          this.userLinks.pop();
        }
      },
      immediate: true,
    },
  },

  computed: {
    ...mapGetters(["getUser", "getToken", "getHasCart", "getTotalQuantity"]),
  },

  methods: {
    ...mapActions(["authenticateUser", "fetchCart", "logoutUser"]),

    /**
     * Function to handle click of search icon.
     *
     * @param {none}
     * @returns {void}
     */
    handleSearch() {
      this.$router.push({ name: "all-products", query: { q: this.keyword } });
      this.resetData();
    },

    /**
     * Function to handle click of cart icon.
     *
     * @param {none}
     * @returns {void}
     */
    handleCartClick() {
      if (this.$route.name !== "cart") {
        this.$router.push({ name: "cart" });
      }
    },

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

    /**
     * Function to handle click of a product item.
     *
     * @param {none}
     * @returns {void}
     */
    showProductDetails(item) {
      this.$router.push({ name: "product-details", params: { id: item.id } });
    },

    /**
     * Function to reset data for search bar.
     *
     * @param {none}
     * @returns {void}
     */
    resetData() {
      this.keyword = null;
      this.products = [];
      this.selected = [];
    },

    /**
     * Function to authenticate user and fetchCart if user does not have one.
     *
     * @param {none}
     * @returns {void}
     */
    async validateUser() {
      // fetches user authentication
      const response = await this.authenticateUser();

      // if authentication is successful and user does not have a cart
      if (!response.error && !this.getHasCart) {
        this.fetchCart();
      }
    },

    /**
     * Function to get products based on entered search input.
     *
     * @param {none}
     * @returns {void}
     */
    async getProducts() {
      try {
        if (this.keyword) {
          this.loading = true;
          const response = await API.getSearchProducts(this.keyword);
          this.products = response.data.products;
        } else {
          this.products = [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
