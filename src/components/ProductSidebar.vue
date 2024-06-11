<template>
  <v-sheet>
    <!-- heading -->
    <v-subheader class="font-weight-bold">All Categories </v-subheader>

    <v-divider class="mr-4"></v-divider>

    <!-- categories -->
    <v-list dense v-for="category in allCategories" :key="category.name">
      <v-list-item
        exact-path
        class="me-2"
        :to="{ name: 'category-products', params: { category: category.slug } }"
      >
        <v-list-item-content>
          {{ category.name }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductSidebar",

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
