<template>
  <v-container>
    <product-details :product_id="id" />
  </v-container>
</template>

<script>
export default {
  name: "ProductDetailsView",

  components: {
    ProductDetails: () => import("@/components/ProductDetails.vue"),
  },

  props: {
    id: {
      required: true,
    },
  },
};
</script>

<style></style>
