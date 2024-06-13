<template>
  <v-app>
    <v-layout v-if="!loading">
      <the-header-admin @toggle-sidebar="handleToggleSidebar" />
      <the-sidebar-admin v-model="showSidebar" />
      <v-main>
        <!-- main content -->
        <router-view></router-view>
      </v-main>
    </v-layout>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { AdminMixin } from "@/mixins/AdminMixin";

export default {
  components: {
    TheHeaderAdmin: () => import("@/components/TheHeaderAdmin.vue"),
    TheSidebarAdmin: () => import("@/components/TheSidebarAdmin.vue"),
  },

  mixins: [AdminMixin],

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
