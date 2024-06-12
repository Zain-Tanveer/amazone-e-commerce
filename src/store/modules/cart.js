import API from "@/services/API.js";
import { SET_CART_DATA, SET_HAS_CART } from "@/utils/mutations";

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
  [SET_CART_DATA]: (state, payload) => {
    state.cartData = { ...payload.cartData };
  },

  /**
   * Mutation to set the hasCart data property
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [SET_HAS_CART]: (state, payload) => {
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
    const done = (res) => {
      if (res?.status === 200) {
        // if user does not have carts
        if (res.data.total === 0) {
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
          const cartData = res.data.carts[0];
          commit("SET_CART_DATA", { cartData });
          commit("SET_HAS_CART", { hasCart: true });
        }
      } else {
        console.log(res);
      }
    };

    // get user from user module, needed to get user cart
    const user = getters.getUser;

    await API.get(`/carts/user/${user.id}`, done);
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
    const done = (res) => {
      if (res?.status === 201) {
        // needed since the created cart returns id '51'
        // and this cart is not created in the dummyjson database
        res.data.id = 1;

        commit("SET_CART_DATA", { cartData: res.data });
        commit("SET_HAS_CART", { hasCart: true });
        commit("SET_SNACKBAR", { message: "Product added to cart!", type: "success" });
      } else {
        commit("SET_SNACKBAR", { message: "Something went wrong!", type: "error" });
      }
    };

    await API.post("/carts/add", done, payload);
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
    const done = (res) => {
      if (res?.status === 200) {
        commit("SET_CART_DATA", { cartData: res.data });
        commit("SET_SNACKBAR", { message: "Product added to cart!", type: "success" });
      } else {
        commit("SET_SNACKBAR", { message: "Something went wrong!", type: "error" });
      }
    };

    // gets user id and set userId in payload
    const user = getters.getUser;
    payload.userId = user.id;

    // if user has a cart
    if (state.hasCart) {
      // sets the merge property to true,
      // this is needed if we need to merge the
      // new data with existing cart data
      payload.merge = true;

      await API.put(`/carts/${state.cartData.id}`, done, payload);
    } else {
      // if user does not have a cart
      await dispatch("createCart", payload);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
