<template>
  <v-app>
    <template v-if="!loading">
      <the-header-admin @toggle-sidebar="handleToggleSidebar" />
      <the-sidebar-admin v-model="showSidebar" />

      <v-main>
        <!-- main content -->
        <router-view></router-view>
      </v-main>

      <v-footer app outlined inset class="pa-0 ma-4">
        <admin-dashboard-message-editor />
      </v-footer>
    </template>

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
    AdminDashboardMessageEditor: () => import("@/components/AdminDashboardMessageEditor.vue"),
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
