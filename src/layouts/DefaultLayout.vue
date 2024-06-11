<template>
  <v-app>
    <the-header />
    <v-main>
      <!-- main content -->
      <router-view></router-view>
    </v-main>
    <!-- <the-footer /> -->
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
// import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    // TheFooter,
  },
};
</script>
