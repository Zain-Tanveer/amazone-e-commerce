<template>
  <v-row no-gutters>
    <!-- cart products loader -->
    <v-col cols="8" class="grey lighten-5 pa-3">
      <card-list-loader v-for="n in 4" :key="n" class="mb-3" />
    </v-col>

    <!-- order summary loader -->
    <v-col cols="4">
      <v-card class="ms-2 py-2" tile elevation="1">
        <v-skeleton-loader type="article"></v-skeleton-loader>

        <v-card-actions>
          <v-skeleton-loader class="ms-2" style="width: 100%">
            <v-btn elevation="0" block disabled> </v-btn>
          </v-skeleton-loader>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CartLoader",

  components: {
    CardListLoader: () => import("@/components/CardListLoader.vue"),
  },
};
</script>

<style scoped></style>
