<template>
  <v-row no-gutters class="mb-5">
    <v-col cols="3" class="d-flex align-center mb-2">
      <h4 class="grey--text text--darken-3 font-weight-semi-bold me-2">{{ label }}</h4>
      <v-chip label x-small v-if="$attrs.required === ''"> Required </v-chip>
    </v-col>
    <v-col cols="9">
      <slot name="input-field">
        <v-text-field dense v-bind="$attrs" v-on="$listeners"></v-text-field>
      </slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  inheritAttrs: false,

  name: "AdminBaseInput",

  props: ["label"],
};
</script>

<style></style>
