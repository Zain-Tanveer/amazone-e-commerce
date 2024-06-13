<template>
  <v-layout>
    <v-container class="mb-10" v-if="!loadingProduct">
      <h4 class="blue-grey--text text--darken-3 mb-5 mt-5">Update Product</h4>
      <!-- product form -->
      <admin-product-form :updateProduct="product" />
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

import API from "@/services/API.js";

export default {
  name: "AdminProductsCreate",

  components: {
    AdminProductForm: () => import("@/components/AdminProductForm.vue"),
  },

  props: {
    product_id: {
      required: true,
    },
  },

  /**
   * 'created' lifecycle hook to get product by id,
   * if product is not in store then fetchProduct
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    // gets product from store
    const product = this.getProductById(this.product_id);

    // if exists then set the product
    if (product) {
      this.product = product;
      this.loadingProduct = false;
    } else {
      this.fetchProduct();
    }
  },

  data() {
    return {
      product: {},
      loadingProduct: true,
    };
  },

  computed: {
    ...mapGetters(["getProductById"]),
  },

  methods: {
    /**
     * Function to get product by id
     *
     * @param {none}
     * @returns {void}
     */
    async fetchProduct() {
      const done = (res) => {
        if (res?.status === 200) {
          this.product = res.data;
          this.loadingProducts = false;
        } else {
          console.log(res);
        }
      };

      await API.get(`/products/${this.product_id}`, done);
    },
  },
};
</script>

<style></style>
