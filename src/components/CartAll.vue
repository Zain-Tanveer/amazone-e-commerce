<template>
  <v-row no-gutters>
    <!-- cart products -->
    <v-col
      cols="8"
      class="grey lighten-5 pa-3"
      :class="{ 'd-flex align-center': !products.length }"
    >
      <v-card
        tile
        v-for="product in products"
        :key="product.id"
        hover
        :to="{ name: 'product-details', params: { id: product.id } }"
        class="mb-4"
      >
        <v-row no-gutters>
          <!-- product image -->
          <v-col cols="3">
            <v-img max-height="200" max-width="200" :src="product.thumbnail"></v-img>
          </v-col>

          <!-- product details -->
          <v-col cols="6" class="d-flex flex-column">
            <!-- product title -->
            <v-card-title>
              <span class="text-truncate">{{ product.title }}</span>
            </v-card-title>

            <!-- actual and discounted price -->
            <v-card-text>
              <div class="text-h6 error--text">${{ productPrice(product) }}</div>
              <div
                class="text-subtitle-2 text-decoration-line-through"
                v-if="product.discountedPrice > 0"
              >
                ${{ product.price }}
              </div>
            </v-card-text>
          </v-col>

          <!-- quantity and product total -->
          <v-col cols="3" class="d-flex flex-column align-center justify-center">
            <div>
              <!-- quantity -->
              <div class="font-weight-bold">
                Quantity :
                <span class="grey--text text--darken-1 font-weight-bold">
                  {{ product.quantity }}
                </span>
              </div>

              <div class="font-weight-bold">
                Total :
                <span class="grey--text text--darken-1 font-weight-bold">
                  {{ product.total.toFixed(2) }}
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- if no products are added to cart -->
      <v-layout class="font-weight-bold" justify-center v-if="!products.length">
        Looks like you have no products.
      </v-layout>
    </v-col>

    <!-- order summary -->
    <v-col cols="4">
      <v-card class="ms-2 py-2" tile elevation="1">
        <v-card-title>Order Summary</v-card-title>

        <!-- sub total -->
        <v-card-text>
          <div class="d-flex justify-space-between">
            <div><span class="font-weight-bold">Subtotal</span> ({{ totalQuantity }} items)</div>
            <div class="black--text">${{ total.toFixed(2) }}</div>
          </div>
          <!-- discounted price -->
          <div class="d-flex justify-space-between">
            <div class="font-weight-bold">Discount</div>
            <div class="black--text">${{ discountedTotal.toFixed(2) }}</div>
          </div>
        </v-card-text>

        <!-- total -->
        <v-card-text>
          <div class="d-flex justify-space-between">
            <div class="font-weight-bold">Total</div>
            <div class="error--text">${{ discountedTotal.toFixed(2) }}</div>
          </div>
        </v-card-text>

        <!-- proceed to checkout button -->
        <v-card-actions>
          <v-btn block color="primary">Proceed to Checkout ({{ totalQuantity }})</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartAll",

  /**
   * 'created' lifecycle hook to get cart data from store
   *
   * @param {none}
   * @returns {none}
   */
  created() {
    const cartData = this.getCartData;

    if (cartData) {
      this.id = cartData.id;
      this.products = cartData.products;
      this.total = cartData.total;
      this.discountedTotal = cartData.discountedTotal;
      this.totalProducts = cartData.totalProducts;
      this.totalQuantity = cartData.totalQuantity;
    }
  },

  data() {
    return {
      id: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      totalProducts: 0,
      totalQuantity: 0,
    };
  },

  computed: {
    ...mapGetters(["getCartData"]),
  },

  methods: {
    /**
     * Method to get the product price based on discount percentage
     *
     * @param {none}
     * @returns {Number} - products actual or discounted price
     */
    productPrice(product) {
      // if product has no discount percentage
      if (!product.discountPercentage) {
        return product.price;
      }

      // Convert the discount percentage to a decimal
      const discountDecimal = product.discountPercentage / 100;
      // Calculate the discount amount
      const discountAmount = product.price * discountDecimal;
      // Calculate the discounted price
      const discountedPrice = product.price - discountAmount;

      return discountedPrice.toFixed(2);
    },
  },
};
</script>

<style></style>
