<template>
  <v-container>
    <!-- if there are no products -->
    <template v-if="total != 0">
      <v-row no-gutters>
        <v-col cols="12" class="my-4">
          <span>{{ total }} products found</span
          ><span v-if="category">
            in <span class="primary--text font-weight-bold">{{ category }}</span></span
          >.
        </v-col>
      </v-row>
    </template>

    <!-- products list -->
    <template v-if="products.length">
      <v-row no-gutters>
        <v-col v-for="product in products" :key="product.id" cols="12" class="my-2">
          <!-- single product -->
          <card-list :product="product" />
        </v-col>
      </v-row>

      <!-- pagination -->
      <div class="text-center my-5">
        <v-pagination v-model="page" :length="totalPages" :total-visible="7"></v-pagination>
      </div>
    </template>

    <!-- loader for total products -->
    <template v-if="!total && fetching">
      <v-row no-gutters>
        <v-col cols="4" class="my-4">
          <v-skeleton-loader type="list-item" class="grey lighten-2"> </v-skeleton-loader>
        </v-col>
      </v-row>
    </template>

    <!-- loader for product list -->
    <template v-if="!products.length && fetching">
      <v-row no-gutters>
        <v-col v-for="n in 8" :key="n" cols="12" class="my-2">
          <card-list-loader />
        </v-col>
      </v-row>
    </template>

    <!-- if no products are found -->
    <template v-if="!products.length && !fetching"> No products found. </template>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import API from "@/services/API.js";

export default {
  name: "ProductList",

  components: {
    CardList: () => import("@/components/CardList.vue"),
    CardListLoader: () => import("@/components/CardListLoader.vue"),
  },

  props: {
    category: {
      default: "",
    },
  },

  /**
   * 'created' lifecycle hook to fetch products
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    this.fetchProducts();
  },

  watch: {
    /**
     * watcher to track changes for 'category' change
     *
     * @param {none}
     * @returns {void}
     */
    category() {
      this.skip = 0;
      this.page = 1;
      this.products = [];
      this.total = 0;
      this.goToTop();
      this.fetchProducts();
    },

    /**
     * watcher to track changes for 'page' change
     *
     * @param {Number} newPage - new value for page
     * @returns {void}
     */
    page(newPage) {
      // if newPage is 1 the resets skip
      if (newPage === 1) {
        this.skip = 0;
        this.products = [];
        this.goToTop();
        this.fetchProducts();
      } else {
        const skip = (newPage - 1) * this.limit;

        if (skip < this.total) {
          this.skip = skip;
          this.products = [];
          this.goToTop();
          this.fetchProducts();
        }
      }
    },
  },

  data() {
    return {
      products: [],
      total: 0,
      limit: 20,
      skip: 0,
      page: 1,
      fetching: null,
    };
  },

  computed: {
    /**
     * Computed property to total pages.
     *
     * @param {none}
     * @returns {Number} - total pages value
     */
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
  },

  methods: {
    ...mapMutations(["SET_PRODUCTS"]),

    /**
     * Function to fetch products.
     *
     * @param {none}
     * @returns {void}
     */
    async fetchProducts() {
      const done = (res) => {
        if (res?.status === 200) {
          this.setData(res.data);
        } else {
          console.log(res);
        }
      };

      this.fetching = true;

      // if url has category then fetch category products
      if (this.category) {
        await API.get(
          `/products/category/${this.category}?limit=${this.limit}&skip=${this.skip}`,
          done
        );
      } else {
        await API.get(`/products?skip=${this.skip}`, done);
      }

      this.fetching = false;
    },

    /**
     * Function to set the products, total, and skip data properties.
     * this function commits a mutation which sets the products[] array
     * useful for when a user clicks on a product for its details
     *
     * @param {none}
     * @returns {void}
     */
    setData({ products, total, skip }) {
      this.SET_PRODUCTS({ products });
      this.products = products;
      this.total = total;
      this.skip = skip;
    },

    /**
     * Function to scroll to top of the page.
     *
     * @param {none}
     * @returns {void}
     */
    goToTop() {
      this.$vuetify.goTo(0, { duration: 300, offset: 0, easing: "easeInOutCubic" });
    },
  },
};
</script>

<style></style>
