<template>
  <login-form />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginView",

  components: {
    LoginForm: () => import("@/components/LoginForm.vue"),
  },

  computed: {
    ...mapGetters(["getIsActive"]),
  },

  watch: {
    /**
     * watcher to track changes for 'isActive'
     * since the authentication takes time, if a user
     * directly tries to access login in url and
     * is active changes then user is redirected to home page
     *
     * @param {Boolean} newVal - new value for isActive
     * @returns {void}
     */
    getIsActive(newVal) {
      if (newVal === true) {
        // if the user accesses any route that is protected, then the
        // user is redirected back to login page. With this the user can
        // go back to the protected page they tried to access after logging in.
        const redirectPath = this.$route.query.redirect || "/";
        this.$router.push(redirectPath);
      }
    },
  },
};
</script>

<style></style>
