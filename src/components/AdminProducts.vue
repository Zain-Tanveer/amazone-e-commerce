<template>
  <!-- eslint-disable vue/valid-v-slot -->
  <v-container fluid>
    <v-card>
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
              <span v-bind="attrs" v-on="on" class="text-no-wrap">{{ value.slice(0, 16) }}...</span>
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
          <v-tooltip bottom v-if="value.length > 80" max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="text-no-wrap">{{ value.slice(0, 80) }}...</span>
            </template>
            <span>{{ value }}</span>
          </v-tooltip>
          <span v-if="value.length <= 80">{{ value }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import API from "@/services/API.js";

import _ from "lodash";

export default {
  name: "AdminProducts",

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
        {
          text: "Id",
          sortable: false,
          value: "id",
        },
        {
          text: "Title",
          value: "title",
          sortable: false,
        },
        {
          text: "Description",
          value: "description",
          sortable: false,
        },
        {
          text: "Brand",
          value: "brand",
          sortable: false,
        },
        {
          text: "Category",
          value: "category",
          sortable: false,
        },
        {
          text: "Availability",
          value: "availabilityStatus",
          align: "center",
          sortable: false,
        },
        {
          text: "Stock",
          value: "stock",
          sortable: false,
        },
      ];
    },
  },

  methods: {
    pageUpdateFunction(val) {
      console.log("page update", val);

      const skip = (val - 1) * this.limit;

      if (skip < this.total) {
        this.fetching = true;

        this.skip = skip;
        this.products = [];
        this.goToTop();
        this.debounceGetProducts();
      }
    },

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
     * Function to set the products, total, and skip data properties.
     * this function commits a mutation which sets the products[] array
     * useful for when a user clicks on a product for its details
     *
     * @param {none}
     * @returns {void}
     */
    setData({ products, total, skip }) {
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
