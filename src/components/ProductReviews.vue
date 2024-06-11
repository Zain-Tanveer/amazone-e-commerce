<template>
  <v-sheet class="grey lighten-5 mt-5" elevation="1">
    <!-- heading -->
    <v-subheader class="text-subtitle-1 primary--text font-weight-bold">
      Product Reviews
    </v-subheader>

    <!-- reviews -->
    <v-row no-gutters>
      <v-col class="py-2 px-2" cols="12" v-for="(review, index) in reviews" :key="index">
        <v-card elevation="0">
          <!-- reviewer name and email -->
          <v-card-text>
            <div class="text-subtitle-1 black--text">{{ review.reviewerName }}</div>
            <div class="text-subtitle-2">{{ review.reviewerEmail }}</div>

            <!-- reviewer's given rating in stars -->
            <div class="d-flex align-center mx-0">
              <v-rating
                :value="review.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <!-- reviewer's given rating -->
              <div class="grey--text ms-2">{{ review.rating }}</div>
            </div>

            <!-- reviewer's comment -->
            <div class="mt-1">{{ review.comment }}.</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "ProductReviews",

  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
