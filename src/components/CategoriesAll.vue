<template>
  <v-container>
    <!-- Categories Heading -->
    <v-subheader class="text-h6 primary--text font-weight-bold">Categories</v-subheader>

    <!-- categories -->
    <v-row dense>
      <template v-if="allCategories.length">
        <v-col
          v-for="category in allCategories.slice(0, 12)"
          :key="category.name"
          cols="12"
          lg="2"
          md="3"
          sm="6"
        >
          <v-card
            :to="{ path: `/products/${category.slug}` }"
            tile
            text
            hover
            height="120"
            class="d-flex align-center text-center"
          >
            <v-card-text class="font-weight-bold">
              {{ category.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </template>

      <!-- categories loader -->
      <template v-else>
        <v-col v-for="n in 12" :key="n" cols="2">
          <v-skeleton-loader height="120" type="card"></v-skeleton-loader>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategoriesAll",

  /**
   * 'created' lifecycle hook to fetch categories if allCategories[] is empty
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    if (!this.allCategories.length) {
      this.fetchCategories();
    }
  },

  computed: {
    ...mapGetters(["allCategories"]),
  },

  methods: {
    ...mapActions(["fetchCategories"]),
  },
};
</script>

<style></style>
