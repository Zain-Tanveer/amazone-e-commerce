<template>
  <!-- card grid -->
  <v-card hover :to="{ name: 'product-details', params: { id: product.id } }">
    <!-- product image -->
    <v-img height="250" :src="product.thumbnail"></v-img>

    <!-- product title -->
    <v-card-title>
      <span class="text-truncate">{{ product.title }}</span>
    </v-card-title>

    <v-spacer></v-spacer>

    <v-card-text>
      <!-- product rating in stars -->
      <v-row align="center" class="mx-0">
        <v-rating
          :value="product.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <!-- product rating and total reviews -->
        <div class="grey--text ms-4">{{ product.rating }} ({{ totalReviews }})</div>
      </v-row>

      <!-- actual and discount price -->
      <div class="d-flex align-center">
        <div class="my-4 text-h6 me-2 error--text">${{ productPrice }}</div>
        <div class="my-4 text-subtitle-2 text-decoration-line-through" v-if="hasDiscount">
          ${{ product.price }}
        </div>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <!-- view details button -->
    <v-card-actions>
      <v-btn color="primary lighten-2" text> View Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { CardMixin } from "@/mixins/CardsMixin.js";
import { ProductMixin } from "@/mixins/ProductsMixin.js";

export default {
  name: "CardGrid",

  mixins: [CardMixin, ProductMixin],
};
</script>

<style></style>
