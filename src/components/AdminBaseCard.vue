<template>
  <v-col cols="12">
    <v-card class="pa-4" tile>
      <v-card-title class="grey--text text-body-1 font-weight-bold">
        {{ title }}
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "AdminBaseCard",

  props: ["title"],
};
</script>

<style></style>
