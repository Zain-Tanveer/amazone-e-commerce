import API from "@/services/API.js";

const state = {
  productsForYou: [],
  products: [],
};

const getters = {
  /**
   * Getter to get all products for the home page from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All for you products
   */
  forYouProducts: (state) => state.productsForYou,

  /**
   * Getter to get product by id, this is
   * useful for getting product for ProductDetails.vue.
   *
   * @param {Object} state - The current state object.
   * @returns {Object} - single product
   */
  getProductById: (state) => (id) => {
    return (
      state.products.find((product) => product.id == id) ||
      state.productsForYou.find((product) => product.id == id)
    );
  },

  /**
   * Getter to get all products from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All products
   */
  allProducts: (state) => state.products,
};

const mutations = {
  /**
   * Mutation to set the data of products[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_PRODUCTS: (state, payload) => {
    state.products = payload.products;
  },

  /**
   * Mutation to set the data of productsForYou[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_PRODUCTS_FOR_YOU: (state, payload) => {
    state.productsForYou = payload.products;
  },
};

const actions = {
  /**
   * Action to fetch all products, this action commits a mutation
   * which sets the products in productsForYou[] array
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  async fetchProducts({ commit }) {
    try {
      const response = await API.getAllProducts();
      commit("SET_PRODUCTS_FOR_YOU", { products: response.data.products });
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
