import API from "@/services/API.js";
import { SET_USER, SET_TOKEN, SET_REFRESH_TOKEN, SET_IS_ACTIVE } from "@/utils/mutations";

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
  [SET_USER]: (state, payload) => {
    state.user = payload.user;
  },

  /**
   * Mutation to set the data of token property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [SET_TOKEN]: (state, payload) => {
    state.token = payload.token;
  },

  /**
   * Mutation to set the data of refresh token property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [SET_REFRESH_TOKEN]: (state, payload) => {
    state.refreshToken = payload.refreshToken;
  },

  /**
   * Mutation to set the data of isActive property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [SET_IS_ACTIVE]: (state, payload) => {
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
    const done = async (res) => {
      if (res?.status === 200) {
        commit("SET_TOKEN", { token: res.data.token });
        commit("SET_REFRESH_TOKEN", { refreshToken: res.data.refreshToken });
        commit("SET_IS_ACTIVE", { isActive: true });

        commit("SET_SNACKBAR", { message: "Login Successful!", type: "success" });

        // needed to fetch detailed user
        // info for admin dashboard
        await dispatch("authenticateUser");

        // fetches user's cart
        dispatch("fetchCart");
      } else {
        if (res?.response?.status === 400) {
          // if login fails then show response message
          commit("SET_SNACKBAR", { message: res?.response?.data?.message, type: "error" });
        }
      }
    };

    // sets the token expiration time to 1 minute
    // useful for testing
    // payload.expiresInMins = 1;

    await API.post("/auth/login", done, payload);
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
    let response = {};

    const done = (res) => {
      if (res?.status === 200) {
        commit("SET_USER", { user: res.data });
        commit("SET_IS_ACTIVE", { isActive: true });
      } else if (res?.response?.status === 401) {
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

          response.error = "Token expired!";
        } else {
          // if user is active but the token expires
          // then dispatch an action which refreshes session
          dispatch("refreshSession");
        }
      }
    };

    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await API.get("/auth/me", done, headers);

    return response;
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
    const done = (res) => {
      if (res?.status === 200) {
        commit("SET_TOKEN", { token: res.data.token });
        commit("SET_REFRESH_TOKEN", { refreshToken: res.data.refreshToken });
      } else {
        console.log(res);
      }
    };

    const payload = {
      refreshToken: state.refreshToken,
    };

    await API.post("/auth/refresh", done, payload);
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
