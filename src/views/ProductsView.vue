<template>
  <v-container>
    <!-- products breadcrumbs -->
    <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>

    <v-divider></v-divider>

    <!-- products sidebar -->
    <v-row no-gutters>
      <v-col cols="3">
        <product-sidebar />
      </v-col>

      <!-- all products in list -->
      <v-col cols="9" class="grey lighten-5">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductsView",

  props: {
    category: {
      default: "",
    },
  },

  components: {
    ProductSidebar: () => import("@/components/ProductSidebar.vue"),
  },

  computed: {
    /**
     * Computed property to get breadcrumbs information
     *
     * @param {none}
     * @returns {Array} - breadcrumbs array
     */
    breadcrumbItems() {
      // if there is category in routes
      if (this.category) {
        return [
          { text: "home", to: { name: "all-products" }, exact: true },
          {
            text: `${this.category}`,
            to: { name: "category-products", params: { category: this.category } },
            exact: true,
          },
        ];
      }

      return [{ text: "home", to: { name: "all-products" }, exact: true }];
    },
  },
};
</script>

<style></style>
