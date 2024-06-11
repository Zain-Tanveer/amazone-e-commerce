<template>
  <!-- card list loader -->
  <v-card>
    <v-row no-gutters>
      <v-col cols="3">
        <v-skeleton-loader type="image" class="ma-1"></v-skeleton-loader>
      </v-col>

      <v-col cols="7" class="d-flex flex-column">
        <v-skeleton-loader type="list-item" style="width: 80%"></v-skeleton-loader>
        <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader type="actions" class="align-self-start"></v-skeleton-loader>
      </v-col>

      <v-col cols="2">
        <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardListLoader",
};
</script>

<style></style>
