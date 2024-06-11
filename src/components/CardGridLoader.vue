<template>
  <!-- card grid loader -->
  <v-card>
    <v-skeleton-loader type="card" height="250" />
    <v-skeleton-loader type="list-item-two-line" />

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-skeleton-loader class="ms-2" type="button" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardGridLoader",
};
</script>

<style></style>
