import API from "@/services/API.js";

const state = {
  cartData: {
    products: [],
    id: 0,

    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
  },

  hasCart: false,
};

const getters = {
  /**
   * Getter to get the cartData from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Object} - Cart data
   */
  getCartData: (state) => state.cartData,

  /**
   * Getter to get all cart products from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All cart products
   */
  getCartProducts: (state) => state.cartData.products,

  /**
   * Getter to get hasCart property from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Boolean} hasCart value
   */
  getHasCart: (state) => state.hasCart,

  /**
   * Getter to get total cart products in cartData from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Number} total products value
   */
  getTotalProducts: (state) => state.cartData.totalProducts,

  /**
   * Getter to get total product quantity in cartData from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Number} - total quantity value
   */
  getTotalQuantity: (state) => state.cartData.totalQuantity,
};

const mutations = {
  /**
   * Mutation to set the cartData
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_CART_DATA: (state, payload) => {
    state.cartData = { ...payload.cartData };
  },

  /**
   * Mutation to set the hasCart data property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_HAS_CART: (state, payload) => {
    state.hasCart = payload.hasCart;
  },
};

const actions = {
  /**
   * Action to fetch cart information, this action commits multiple mutations
   * which sets the cartData, and hasCart properties
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  async fetchCart({ commit, getters }) {
    try {
      // get user from user module, needed to get user cart
      const user = getters.getUser;

      // fetches user carts
      const response = await API.getCartByUser(user);
      // if user does not have carts
      if (response.data.total === 0) {
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
      } else {
        // gets the first cart and sets the data accordingly
        const cartData = response.data.carts[0];
        commit("SET_CART_DATA", { cartData });
        commit("SET_HAS_CART", { hasCart: true });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Action to fetch create a cart, this action commits multiple mutations
   * which sets the cartData, and hasCart properties
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {Object} - either empty or contains error, useful for displaying error to user
   */
  async createCart({ commit }, payload) {
    try {
      // creates a new cart
      const response = await API.createCart(payload);

      // needed since the created cart returns id '51'
      // and this cart is not created in the dummyjson database
      response.data.id = 1;

      commit("SET_CART_DATA", { cartData: response.data });
      commit("SET_HAS_CART", { hasCart: true });

      return {};
    } catch (error) {
      return { error: error.message };
    }
  },

  /**
   * Action to fetch update cart, this action commits a mutation
   * which sets the cartData, it also dispatches createCart action if
   * cart does not exist
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {Object} - either empty or contains error, useful for displaying error to user
   */
  async updateCart({ state, getters, commit, dispatch }, payload) {
    // gets user id and set userId in payload
    const user = getters.getUser;
    payload.userId = user.id;

    // if user has a cart
    if (state.hasCart) {
      try {
        // sets the merge property to true,
        // this is needed if we need to merge the
        // new data with existing cart data
        payload.merge = true;
        const response = await API.updateCart({
          cart_id: state.cartData.id,
          data: payload,
        });

        commit("SET_CART_DATA", { cartData: response.data });
        return {};
      } catch (error) {
        console.log(error);
        return { error: error.message };
      }
    } else {
      // if user does not have a cart
      const response = await dispatch("createCart", payload);
      return response;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
