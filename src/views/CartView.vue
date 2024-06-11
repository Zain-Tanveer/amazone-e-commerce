<template>
  <v-container>
    <cart-loader v-if="loading" />
    <cart-all v-if="!loading" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartView",

  components: {
    CartAll: () => import("@/components/CartAll.vue"),
    CartLoader: () => import("@/components/CartLoader.vue"),
  },

  /**
   * 'created' lifecycle hook used authenticate user
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    this.isUserAuthenticated();
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapGetters(["getCartData", "getHasCart"]),
  },

  methods: {
    ...mapActions(["authenticateUser", "fetchCart"]),

    /**
     * Function to check if user is authenticated
     * and also fetch cart if user does not have a cart
     *
     * @param {none}
     * @returns {void}
     */
    async isUserAuthenticated() {
      const response = await this.authenticateUser();

      if (response.error) {
        this.$router.push({ name: "login", query: { redirect: this.$route.fullPath } });
        return;
      }

      if (!this.getHasCart) {
        await this.fetchCart();
      }

      this.loading = false;
    },
  },
};
</script>

<style></style>
