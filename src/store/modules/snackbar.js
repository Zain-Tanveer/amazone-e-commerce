const state = {
  snackbar: {},
};

const getters = {
  /**
   * Getter to get all products for the home page from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Object} snackbar
   */
  getSnackbar: (state) => state.snackbar,
};

const mutations = {
  /**
   * Mutation to set the data of snackbar
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_SNACKBAR: (state, payload) => {
    state.snackbar = payload;
  },
};

export default {
  state,
  getters,
  mutations,
};
