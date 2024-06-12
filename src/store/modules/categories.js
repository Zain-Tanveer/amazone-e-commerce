import API from "@/services/API";
import { SET_CATEGORIES } from "@/utils/mutations";

const state = {
  categories: [],
};

const getters = {
  /**
   * Getter to get all categories from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All categories
   */
  allCategories: (state) => state.categories,
};

const mutations = {
  /**
   * Mutation to set the data of categories[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [SET_CATEGORIES]: (state, payload) => {
    state.categories = payload.categories;
  },
};

const actions = {
  /**
   * Action to fetch all categories, this action commits a mutation
   * which sets the categories in categories[] array
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  async fetchCategories({ commit }) {
    const done = (res) => {
      if (res?.status === 200) {
        commit("SET_CATEGORIES", { categories: res.data });
      } else {
        commit("SET_SNACKBAR", { message: `Data ${res?.response?.data}`, type: "error" });
      }
    };

    await API.get("/products/categories", done);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
