<template>
  <div>
    <v-sheet class="mt-5" elevation="1" v-if="!loadingProducts">
      <v-row no-gutters>
        <!-- product image -->
        <v-col cols="3" class="d-flex flex-column">
          <v-img
            class="grey lighten-5"
            :src="productImage"
            contain
            height="320"
            width="320"
          ></v-img>

          <!-- product other images -->
          <div class="d-flex mb-5 mx-1">
            <v-avatar
              tile
              size="60"
              v-for="(image, index) in product.images"
              :key="index"
              class="product-images"
            >
              <v-img :src="image" contain @mouseover="productImage = image" />
            </v-avatar>
          </div>
        </v-col>

        <!-- product details -->
        <v-col cols="6">
          <!-- product title -->
          <v-card-title>
            <span>{{ product.title }}</span>
          </v-card-title>

          <v-card-text>
            <!-- product's ratings -->
            <v-row class="d-flex align-center mx-0">
              <v-rating
                :value="product.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <!-- product's ratings and total reviews -->
              <div class="grey--text ms-2">{{ product.rating }} ({{ totalReviews }})</div>
            </v-row>

            <!-- product's description -->
            <div class="mt-5">{{ product.description }}.</div>
          </v-card-text>

          <v-divider class="mx-3"></v-divider>

          <!-- product's actual and discounted price -->
          <v-card-text>
            <div class="text-h5 error--text">${{ productPrice }}</div>
            <div class="text-subtitle-1 text-decoration-line-through" v-if="hasDiscount">
              ${{ product.price }}
            </div>
          </v-card-text>

          <!-- additional product details -->
          <div class="mx-4">
            <div class="text-subtitle-1 font-weight-bold">Product Details</div>
            <v-list-item
              v-for="detail in productDetails"
              :key="detail.name"
              dense
              class="details-item | px-0"
            >
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-icon>mdi-circle-small</v-icon>
                  <span class="font-weight-bold">{{ detail.name }} - </span>
                  <span> {{ detail.info }} </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-col>

        <!-- additional information and add to cart -->
        <v-col cols="3" class="pa-2 elevation-1">
          <!-- price -->
          <div class="text-h5 font-weight-bold">${{ productPrice }}</div>
          <!-- shipping information -->
          <div class="grey--text lighten1--text">{{ product.shippingInformation }}</div>

          <v-divider class="mx-1 mt-2"></v-divider>

          <!-- availability status -->
          <v-list-item class="px-1">
            <v-list-item-content class="py-0">
              <v-list-item-title>
                <span
                  class="font-weight-bold"
                  :class="[
                    { 'green--text': product.stock > 0 },
                    { 'red--text': product.stock <= 0 },
                  ]"
                >
                  {{ product.availabilityStatus }}
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- quantity selector -->
          <div class="quantity | d-flex align-center mb-6">
            <div class="grey--text text--darken-1">Quantity</div>
            <v-btn elevation="0" small :disabled="quantity <= 1" @click="quantity--">
              <v-icon>mdi-minus</v-icon>
            </v-btn>

            <div class="font-weight-bold">{{ quantity }}</div>

            <v-btn elevation="0" small :disabled="quantity >= product.stock" @click="quantity++">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>

          <!-- buttons -->
          <div class="buttons | d-flex flex-column">
            <!-- add to cart button -->
            <v-btn
              :loading="loading"
              :disabled="product.stock <= 0"
              rounded
              color="primary"
              @click.stop="handleAddToCart"
            >
              Add to Cart
            </v-btn>
            <v-btn :disabled="product.stock <= 0" rounded color="primary lighten-2">Buy Now</v-btn>
          </div>
        </v-col>
      </v-row>

      <not-logged-in-dialog v-model="showDialog" @close-dialog="showDialog = false" />
    </v-sheet>

    <!-- product reviews -->
    <product-reviews :reviews="product.reviews" v-if="!loadingProducts" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import API from "@/services/API";

import { ProductMixin } from "@/mixins/ProductsMixin.js";

export default {
  name: "ProductDetails",

  mixins: [ProductMixin],

  components: {
    ProductReviews: () => import("@/components/ProductReviews.vue"),
    NotLoggedInDialog: () => import("@/components/common/NotLoggedInDialog.vue"),
  },

  props: {
    product_id: {
      required: true,
    },
  },

  /**
   * 'created' lifecycle hook to get product by id,
   * if product is not in store the fetchProduct
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    // gets product from store
    const product = this.getProductById(this.product_id);

    // if exists then set the product, productImage, and quantity data property
    if (product) {
      this.product = product;
      this.productImage = product.images[0];

      // if product has available stock then set the quantity to 1
      if (product.stock > 0) {
        this.quantity = 1;
      }

      this.loadingProducts = false;
    } else {
      this.fetchProduct();
    }
  },

  data() {
    return {
      product: {},
      productImage: "",
      loading: false,
      showDialog: false,
      quantity: 0,
      loadingProducts: true,
    };
  },

  watch: {
    /**
     * watcher to track changes for 'page' change
     *
     * @param {Number} newPage - new value for page
     * @returns {void}
     */
    product_id() {
      // make changes here
    },
  },

  computed: {
    ...mapGetters(["getProductById", "getHasCart"]),

    /**
     * computed property to get information about product details
     *
     * @param {none}
     * @returns {Array} - product details
     */
    productDetails() {
      return [
        { name: "Brand", info: this.product.brand ? this.product.brand : "No brand." },
        { name: "Category", info: this.product.category ? this.product.category : "No category." },
        {
          name: "Warranty Information",
          info: this.product.warrantyInformation
            ? this.product.warrantyInformation
            : "No Warranty.",
        },
        { name: "Dimensions", info: this.productDimensions },
      ];
    },

    /**
     * computed property to get product dimensions
     *
     * @param {none}
     * @returns {String} - product dimensions
     */
    productDimensions() {
      if (!this.product.dimensions) {
        return "No dimensions";
      }

      const width = this.product.dimensions.width || "";
      const height = this.product.dimensions.height ? ` x ${this.product.dimensions.height}` : "";
      const depth = this.product.dimensions.depth ? ` x ${this.product.dimensions.depth}` : "";

      return `${width}${height}${depth}`;
    },
  },

  methods: {
    ...mapActions(["authenticateUser", "updateCart"]),

    /**
     * Function to handle add to cart click
     *
     * @param {none}
     * @returns {void}
     */
    async handleAddToCart() {
      this.loading = true;

      // gets user authentication
      const authResp = await this.authenticateUser();

      // if user is not authenticated then show dialog
      if (authResp.error) {
        this.showDialog = true;
      } else {
        const payload = {
          products: [
            {
              id: this.product.id,
              quantity: this.quantity,
            },
          ],
        };

        // trigger updateCart action to update the user cart
        await this.updateCart(payload);
      }

      this.loading = false;
    },

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
          this.productImage = res.data.images[0];

          // if product has available stock then set the quantity to 1
          if (res.data.stock > 0) {
            this.quantity = 1;
          }

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

<style scoped>
.product-images {
  cursor: pointer;
  border: solid 1px rgb(175, 175, 175);
}

.product-images:hover {
  border: solid 1px rgb(48, 69, 229);
}

.details-item {
  min-height: fit-content;
}

.buttons {
  gap: 0.5rem;
}

.quantity {
  gap: 0.75rem;
}
</style>
