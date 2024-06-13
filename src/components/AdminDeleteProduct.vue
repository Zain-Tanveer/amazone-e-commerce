<template>
  <!-- dialog box for if user clicks add to cart and is not logged in -->
  <v-dialog
    :persistent="loading"
    :value="value"
    max-width="450"
    v-bind="$attrs"
    @click:outside="loading ? '' : $emit('close-dialog')"
  >
    <v-card>
      <!-- title -->
      <v-card-title class="text-h5 error--text font-weight-bold">Warning! </v-card-title>
      <!-- description -->
      <v-card-text> Are you sure you want to delete this product? </v-card-text>

      <!-- buttons -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary darken-5" @click="$emit('close-dialog')" :disabled="loading">
          Cancel
        </v-btn>
        <v-btn
          color="error darken-1"
          text
          @click="$emit('delete-product', product_id)"
          :loading="loading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,

  name: "AdminDeleteProduct",

  props: {
    value: {
      required: true,
    },
    product_id: {
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
};
</script>

<style></style>
