<template>
  <!-- dialog box for if user clicks add to cart and is not logged in -->
  <v-dialog :value="value" max-width="450" v-bind="$attrs" @click:outside="$emit('close-dialog')">
    <v-card>
      <!-- title -->
      <v-card-title class="text-h5 primary--text font-weight-bold"
        >Looks like you are not logged in!
      </v-card-title>
      <!-- description -->
      <v-card-text> Would you like to login or continue browsing? </v-card-text>

      <!-- buttons -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary darken-1"
          text
          :to="{ name: 'login', query: { redirect: $route.fullPath } }"
          @click="$emit('close-dialog')"
        >
          Login
        </v-btn>
        <v-btn color="primary darken-5" @click="$emit('close-dialog')"> Continue Browsing </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,

  name: "NotLoggedInDialog",

  props: {
    value: {
      required: true,
    },
  },
};
</script>

<style></style>
