<script>
import { mapGetters } from "vuex";

export default {
  name: "app",

  components: {
    DefaultLayout: () => import("./layouts/DefaultLayout.vue"),
    AdminLayout: () => import("./layouts/AdminLayout.vue"),
  },

  data() {
    return {
      defaultLayout: "DefaultLayout",
    };
  },

  watch: {
    getSnackbar(newVal) {
      if (newVal.message) {
        this.$toast[newVal.type](newVal.message);
      }
    },
  },

  computed: {
    ...mapGetters(["getSnackbar"]),

    layout() {
      return this.$route.meta.layout ? this.$route.meta.layout : this.defaultLayout;
    },
  },
};
</script>

<template>
  <component :is="layout"></component>
</template>

<style scoped></style>
