<template>
  <v-app>
    <the-header-admin @toggle-sidebar="handleToggleSidebar" />
    <the-sidebar-admin v-model="showSidebar" />
    <v-main class="grey lighten-5">
      <!-- main content -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    TheHeaderAdmin: () => import("@/components/TheHeaderAdmin.vue"),
    TheSidebarAdmin: () => import("@/components/TheSidebarAdmin.vue"),
  },

  data() {
    return {
      showSidebar: null,
    };
  },

  methods: {
    handleToggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>
