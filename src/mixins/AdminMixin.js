import { mapGetters, mapActions } from "vuex";

export const AdminMixin = {
  /**
   * 'created' lifecycle hook used authenticate user
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    this.validateUser();
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapGetters(["getUser"]),
  },

  methods: {
    ...mapActions(["authenticateUser"]),

    /**
     * Function to authenticate user and check if user is admin
     *
     * @param {none}
     * @returns {void}
     */
    async validateUser() {
      // fetches user authentication
      const response = await this.authenticateUser();

      // if authentication is not successful or user is not an admin
      if (response.error || this.getUser.role !== "admin") {
        this.$router.push({ name: "home" });
        return;
      }

      this.loading = false;
    },
  },
};
