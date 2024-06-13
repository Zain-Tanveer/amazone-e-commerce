<template>
  <v-layout>
    <!-- eslint-disable vue/valid-v-slot -->
    <v-container fluid v-if="!loading">
      <div class="mb-5 mt-3 d-flex justify-space-between align-center">
        <h4 class="blue-grey--text text--darken-2">Products</h4>
        <v-btn color="primary" :to="{ name: 'admin-products-create' }">
          <v-icon class="me-2">mdi-package-variant-plus</v-icon>
          <span class="font-weight-bold">Add a Product</span>
        </v-btn>
      </div>

      <v-card>
        <!-- data table -->
        <v-data-table
          :loading="fetching"
          :height="530"
          :headers="headers"
          :items="products"
          :page="page"
          :server-items-length="total"
          :items-per-page="limit"
          @update:page="pageUpdateFunction"
        >
          <!-- title -->
          <template #item.title="{ value }">
            <v-tooltip bottom v-if="value.length > 16">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" class="text-no-wrap"
                  >{{ value.slice(0, 16) }}...</span
                >
              </template>
              <span>{{ value }}</span>
            </v-tooltip>
            <span class="text-no-wrap" v-if="value.length <= 16">{{ value }}</span>
          </template>

          <!-- availability -->
          <template #item.availabilityStatus="{ value }">
            <span class="text-no-wrap"> {{ value }} </span>
          </template>

          <!-- description -->
          <template #item.description="{ value }">
            <v-tooltip bottom v-if="value.length > 60" max-width="500">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" class="text-no-wrap"
                  >{{ value.slice(0, 60) }}...</span
                >
              </template>
              <span>{{ value }}</span>
            </v-tooltip>
            <span v-if="value.length <= 60">{{ value }}</span>
          </template>

          <!-- actions -->
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon small class="mr-2" @click="editProduct(item)"> mdi-pencil </v-icon>
                </span>
              </template>
              <span>Edit Product</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon small @click="handleDeleteClick(item)"> mdi-delete </v-icon>
                </span>
              </template>
              <span>Delete Product</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>

      <!-- delete dialog -->
      <admin-delete-product
        :product_id="deleteProductId"
        :loading="deleteLoading"
        v-model="showDialog"
        @close-dialog="showDialog = false"
        @delete-product="handleDelete"
      />
    </v-container>

    <!-- skeleton loader -->
    <v-container v-if="loading">
      <div class="d-flex justify-space-between align-center mb-3">
        <v-skeleton-loader type="image" height="20" width="150"></v-skeleton-loader>
        <v-skeleton-loader type="image" height="35" width="200"></v-skeleton-loader>
      </div>
      <v-skeleton-loader type="image" height="50" tile></v-skeleton-loader>
      <v-skeleton-loader type="image, image" tile></v-skeleton-loader>
      <v-skeleton-loader type="table-tfoot"></v-skeleton-loader>
    </v-container>
  </v-layout>
</template>

<script>
import _ from "lodash";

import { mapMutations } from "vuex";

import API from "@/services/API.js";
import { AdminMixin } from "@/mixins/AdminMixin.js";

export default {
  name: "AdminProducts",

  mixins: [AdminMixin],

  components: {
    AdminDeleteProduct: () => import("@/components/AdminDeleteProduct.vue"),
  },

  /**
   * 'created' lifecycle hook to fetch products
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    this.fetchProducts();
    this.debounceGetProducts = _.debounce(this.fetchProducts, 500);
  },

  data() {
    return {
      products: [],
      total: 0,
      limit: 10,
      skip: 0,
      page: 1,
      fetching: null,
      showDialog: false,

      deleteProductId: 0,
      deleteLoading: false,
    };
  },

  computed: {
    /**
     * Computed property to get headers for data table.
     *
     * @param {none}
     * @returns {Array} - data table headers
     */
    headers() {
      return [
        { text: "Id", sortable: false, value: "id" },
        { text: "Product Title", value: "title", sortable: false },
        { text: "Description", value: "description", sortable: false },
        { text: "Brand", value: "brand", sortable: false },
        { text: "Category", value: "category", sortable: false },
        { text: "Availability", value: "availabilityStatus", align: "center", sortable: false },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ];
    },
  },

  methods: {
    ...mapMutations(["SET_PRODUCTS", "SET_SNACKBAR"]),

    /**
     * Function to handle edit product icon click.
     *
     * @param {Object} product - Contains the product that is clicked
     * @returns {void}
     */
    editProduct(product) {
      this.$router.push({ name: "admin-products-update", params: { product_id: product.id } });
    },

    /**
     * Function handle delete product icon click.
     * Used to open the delete dialog box.
     *
     * @param {Object} product - Contains the product that is clicked
     * @returns {void}
     */
    handleDeleteClick(product) {
      this.deleteProductId = product.id;
      this.showDialog = true;
    },

    /**
     * Function handle click of delete in delete product dialog
     *
     * @param {Number | String} product_id - Contains the product id
     * @returns {void}
     */
    async handleDelete(product_id) {
      this.deleteLoading = true; // sets the loading property to true

      // function passed as parameter to delete api call
      const done = (res) => {
        if (res?.status === 200) {
          this.removeProduct(res.data.id); // removes the product from currently listed products array
          this.SET_SNACKBAR({ message: "Product deleted successfully!", type: "success" });
        } else {
          this.SET_SNACKBAR({ message: "Something went wrong!", type: "error" });
        }
      };

      // api call to delete the product
      await API.delete(`/products/${product_id}`, done);

      this.deleteLoading = false;
      this.showDialog = false;
    },

    /**
     * Function to remove the product from the currently displayed
     * list of products
     *
     * @param {Number | String} product_id - Contains the product id
     * @returns {void}
     */
    removeProduct(id) {
      const newProducts = this.products.filter((product) => product.id != id);
      this.products = newProducts;
    },

    /**
     * Function to fetch products
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
      await API.get(`/products?limit=${this.limit}&skip=${this.skip}`, done);
      this.fetching = false;
    },

    /**
     * Function to handle click of previous or next icon in the footer of data table
     *
     * @param {Number} val - contains the updated page value
     * @returns {void}
     */
    pageUpdateFunction(val) {
      const skip = (val - 1) * this.limit; // calculates product skip value

      if (skip < this.total) {
        this.fetching = true;

        this.skip = skip;
        this.products = [];
        this.goToTop();
        this.debounceGetProducts();
      }
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

<style scoped></style>
