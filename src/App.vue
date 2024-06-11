<script>
export default {
  name: "app",
  data() {
    return {
      defaultLayout: "DefaultLayout",
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout ? this.$route.meta.layout : this.defaultLayout;
    },
  },
  components: {
    DefaultLayout: () => import("./layouts/DefaultLayout.vue"),
    AdminLayout: () => import("./layouts/AdminLayout.vue"),
  },
};
</script>

<template>
  <component :is="layout"></component>
</template>

<style scoped></style>
