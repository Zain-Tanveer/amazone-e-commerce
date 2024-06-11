<template>
  <v-container class="grey lighten-5">
    <!-- heading -->
    <v-subheader class="text-h6 primary--text font-weight-bold">Products For You</v-subheader>

    <!-- all products -->
    <v-row dense>
      <template v-if="forYouProducts.length">
        <v-col v-for="product in forYouProducts" :key="product.id" cols="12" lg="3" md="4" sm="6">
          <card-grid :product="product" />
        </v-col>
      </template>

      <template v-if="!forYouProducts.length">
        <v-col v-for="n in 8" :key="n" cols="12" lg="3" md="4" sm="6">
          <card-grid-loader />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import CardGrid from "./CardGrid.vue";
import CardGridLoader from "./CardGridLoader.vue";

export default {
  name: "ProductsForYou",

  components: {
    CardGrid,
    CardGridLoader,
  },

  /**
   * 'created' lifecycle hook to fetch products if forYouProducts[] is empty
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    if (!this.forYouProducts.length) {
      this.fetchProducts();
    }
  },

  computed: {
    ...mapGetters(["forYouProducts"]),
  },

  methods: {
    ...mapActions(["fetchProducts"]),
  },
};
</script>

<style></style>
