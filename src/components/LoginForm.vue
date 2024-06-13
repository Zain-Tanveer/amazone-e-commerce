<template>
  <v-container class="login-container | d-flex flex-column align-center mt-8">
    <p class="secondary--text">Login to your account to continue</p>
    <p class="grey--text d-flex flex-column align-center">
      <span><span class="font-weight-bold">Admin</span> - emilys , emilyspass</span>
      <span><span class="font-weight-bold">User</span> - averyp , averyppass</span>
    </p>
    <v-card width="480" class="pa-4">
      <!-- login -->
      <v-card-title class="justify-center font-weight-bold text-sm-h4 blue--text text--darken-2">
        Login
      </v-card-title>
      <!-- form -->
      <v-form v-model="valid" @submit.prevent="handleFormSubmit">
        <v-container>
          <v-row>
            <v-col cols="12">
              <!-- username -->
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                prepend-icon="mdi-account-circle"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- password -->
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :rules="passwordRules"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <!-- login button -->
        <v-card-actions>
          <v-btn
            :loading="fetchingData"
            :disabled="valid ? false : true"
            type="submit"
            block
            color="primary"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { loginRules } from "@/utils/validations.js";

export default {
  data: () => ({
    fetchingData: false,
    valid: false,
    showPassword: false,
    username: "",
    password: "",
  }),

  computed: {
    /**
     * Computed property to get username rules.
     *
     * @param {none}
     * @returns {Array} - rules
     */
    usernameRules: () => loginRules.USERNAME_RULES,

    /**
     * Computed property to get password rules.
     *
     * @param {none}
     * @returns {Array} - rules
     */
    passwordRules: () => loginRules.PASSWORD_RULES,
  },

  methods: {
    ...mapActions(["loginUser"]),

    /**
     * Function handle login form submission
     *
     * @param {none}
     * @returns {void}
     */
    async handleFormSubmit() {
      this.fetchingData = true;

      // triggers loginUser action
      await this.loginUser({ username: this.username, password: this.password });

      this.fetchingData = false;
    },
  },
};
</script>

<style scoped></style>
