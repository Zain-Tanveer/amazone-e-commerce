<template>
  <v-dialog
    :persistent="loading"
    :value="value"
    max-width="450"
    v-bind="$attrs"
    @click:outside="loading ? '' : $emit('close-dialog')"
  >
    <v-card class="py-2">
      <div class="d-flex justify-end">
        <v-btn
          height="25"
          width="25"
          min-width="0"
          min-height="0"
          class="pa-0 me-2 rounded-circle"
          depressed
          @click="$emit('close-dialog')"
        >
          <v-icon dense>mdi-close</v-icon>
        </v-btn>
      </div>
      <!-- title -->
      <v-card-title class="text-h6 d-flex justify-center font-weight-bold mt-n7">
        Delete Message
      </v-card-title>
      <!-- description -->
      <v-card-text> Are you sure you want to delete this Message? </v-card-text>

      <v-divider class="my-2"></v-divider>

      <!-- buttons -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary darken-5" @click="$emit('close-dialog')" :disabled="loading">
          Cancel
        </v-btn>
        <v-btn
          tile
          depressed
          color="error darken-1"
          @click="$emit('delete-message', message)"
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
    message: {
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
};
</script>

<style></style>
