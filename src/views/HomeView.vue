<template>
  <v-container>
    <categories-all />
    <products-for-you />
  </v-container>
</template>

<script>
import CategoriesAll from "@/components/CategoriesAll.vue";
import ProductsForYou from "@/components/ProductsForYou.vue";

export default {
  name: "HomeView",

  components: {
    CategoriesAll,
    ProductsForYou,
  },
};
</script>

<style></style>
