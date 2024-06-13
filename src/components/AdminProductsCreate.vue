<template>
  <v-container class="mb-10">
    <h4 class="blue-grey--text text--darken-3 mb-5 mt-5">Create a Product</h4>
    <admin-product-form />
  </v-container>
</template>

<script>
import { AdminMixin } from "@/mixins/AdminMixin.js";

export default {
  name: "AdminProductsCreate",

  mixins: [AdminMixin],

  components: {
    AdminProductForm: () => import("@/components/AdminProductForm.vue"),
  },
};
</script>

<style></style>
