<template>
  <!-- card list -->
  <v-card hover :to="{ name: 'product-details', params: { id: product.id } }">
    <v-row no-gutters>
      <!-- product image -->
      <v-col cols="3">
        <v-img max-height="200" max-width="200" :src="product.thumbnail"></v-img>
      </v-col>

      <!-- product details -->
      <v-col cols="7" class="d-flex flex-column">
        <!-- product title -->
        <v-card-title>
          <span class="text-truncate">{{ product.title }}</span>
        </v-card-title>

        <v-card-text>
          <!-- product rating in stars -->
          <v-row class="d-flex align-center mx-0">
            <v-rating
              :value="product.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <!-- product rating and total reviews -->
            <div class="grey--text ms-2">{{ product.rating }} ({{ totalReviews }})</div>
          </v-row>

          <!-- product description -->
          <div class="mt-5">{{ product.description.split(".")[0] }}.</div>
        </v-card-text>

        <!-- product tags -->
        <v-container>
          <v-chip
            class="mr-2"
            color="primary darken-2"
            label
            text-color="white"
            v-for="(tag, index) in product.tags"
            :key="index"
          >
            {{ tag }}
          </v-chip>
        </v-container>

        <v-spacer></v-spacer>

        <!-- view details button -->
        <v-card-actions>
          <v-btn color="primary lighten-2" text> View Details</v-btn>
        </v-card-actions>
      </v-col>

      <!-- actual and discount price -->
      <v-col cols="2" class="d-flex flex-column mt-4 align-center">
        <div class="text-h5 error--text">${{ productPrice }}</div>
        <div class="text-subtitle-1 text-decoration-line-through" v-if="hasDiscount">
          ${{ product.price }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { CardMixin } from "@/mixins/CardsMixin.js";
import { ProductMixin } from "@/mixins/ProductsMixin.js";

export default {
  name: "CardList",

  mixins: [CardMixin, ProductMixin],
};
</script>

<style></style>
