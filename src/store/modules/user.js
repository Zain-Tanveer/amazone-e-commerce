import API from "@/services/API.js";

const state = {
  user: {},
  isActive: false,
  token: "",
  refreshToken: "",
};

const getters = {
  /**
   * Getter to get user info from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Object} user object
   */
  getUser: (state) => state.user,

  /**
   * Getter to get all isActive property from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Boolean} isActive value
   */
  getIsActive: (state) => state.isActive,

  /**
   * Getter to token property from state.
   *
   * @param {Object} state - The current state object.
   * @returns {String} token value
   */
  getToken: (state) => state.token,
};

const mutations = {
  /**
   * Mutation to set the data of user{} object
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_USER: (state, payload) => {
    state.user = payload.user;
  },

  /**
   * Mutation to set the data of token property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_TOKEN: (state, payload) => {
    state.token = payload.token;
  },

  /**
   * Mutation to set the data of refresh token property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_REFRESH_TOKEN: (state, payload) => {
    state.refreshToken = payload.refreshToken;
  },

  /**
   * Mutation to set the data of isActive property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_IS_ACTIVE: (state, payload) => {
    state.isActive = payload.isActive;
  },
};

const actions = {
  /**
   * Action to login user, this action commits multiple mutations
   * which sets the user, token, refreshToken, and isActive properties
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {Object} - either empty or contains error, useful for displaying error to user
   */
  async loginUser({ commit, dispatch }, payload) {
    try {
      // getting response from login dummyjson api
      const response = await API.loginUser(payload);
      commit("SET_TOKEN", { token: response.data.token });
      commit("SET_REFRESH_TOKEN", { refreshToken: response.data.refreshToken });
      commit("SET_IS_ACTIVE", { isActive: true });

      // needed to fetch detailed user
      // info for admin dashboard
      await dispatch("authenticateUser");

      // fetches user's cart
      dispatch("fetchCart");

      return {};
    } catch (error) {
      // if login fails then returns error message,
      // this is handled in LoginForm.vue component
      if (error.code === "ERR_BAD_REQUEST") {
        return { error: error.response.data.message };
      }

      return { error: error.message };
    }
  },

  /**
   * Action to authenticate user, this action commits multiple mutations
   * which sets the user, token, refreshToken, and isActive properties
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {Object} - either empty or contains error, useful for displaying error to user
   */
  async authenticateUser({ state, commit, dispatch }) {
    try {
      // if authentication is successful
      const response = await API.authenticateUser({ token: state.token });
      commit("SET_USER", { user: response.data });
      commit("SET_IS_ACTIVE", { isActive: true });

      return {};
    } catch (error) {
      // if authentication fails
      if (error.response && error.response.status === 401) {
        // if user is currently active
        // this is set to true when user logs in
        // will be set to false when user refreshes
        if (!state.isActive) {
          commit("SET_USER", { user: {} });
          commit("SET_TOKEN", { token: "" });
          commit("SET_REFRESH_TOKEN", { refreshToken: "" });
          commit("SET_IS_ACTIVE", { isActive: false });
          commit("SET_HAS_CART", { hasCart: false });
          commit("SET_CART_DATA", {
            cartData: {
              products: [],
              id: 0,
              total: 0,
              discountedTotal: 0,
              totalProducts: 0,
              totalQuantity: 0,
            },
          });

          return { error: "Token expired!" };
        } else {
          // if user is active but the token expires
          // then dispatch an action which refreshes session
          dispatch("refreshSession");
          return {};
        }
      }

      return { error: error.message };
    }
  },

  /**
   * Action to authenticate user, this action commits multiple mutations
   * which sets the token, and refreshToken properties
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  async refreshSession({ state, commit }) {
    try {
      // refreshes the user's token
      const response = await API.refreshSession({ token: state.refreshToken });
      commit("SET_TOKEN", { token: response.data.token });
      commit("SET_REFRESH_TOKEN", { refreshToken: response.data.refreshToken });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Action to authenticate user, this action commits multiple mutations
   * which sets the token, and refreshToken properties
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  async logoutUser({ commit }) {
    try {
      // wait for api response here
      commit("SET_USER", { user: {} });
      commit("SET_TOKEN", { token: "" });
      commit("SET_REFRESH_TOKEN", { refreshToken: "" });
      commit("SET_IS_ACTIVE", { isActive: false });
      commit("SET_HAS_CART", { hasCart: false });
      commit("SET_CART_DATA", {
        cartData: {
          products: [],
          id: 0,
          total: 0,
          discountedTotal: 0,
          totalProducts: 0,
          totalQuantity: 0,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
