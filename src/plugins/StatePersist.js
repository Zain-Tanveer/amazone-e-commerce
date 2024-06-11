import VuexPersistence from "vuex-persist";

/**
 * VuexPersistance object used to persist vuex state in local storage
 *
 * @param {PersistOptions}
 */
export const stateLocal = new VuexPersistence({
  storage: window.localStorage, // which storage to use

  // restores the saved local storage data
  restoreState: (key, storage) => {
    const storedState = JSON.parse(storage.getItem(key));
    return (
      {
        categoriesModule: { ...storedState },
        productsModule: { ...storedState },
        cartModule: { ...storedState },
      } || {}
    );
  },

  reducer: (state) => ({
    categories: state.categoriesModule.categories,
    productsForYou: state.productsModule.productsForYou,
    products: state.productsModule.products,
    cartData: state.cartModule.cartData,
    hasCart: state.cartModule.hasCart,
  }),

  // will only update the local storage if one of these mutations fire
  filter: (mutation) =>
    [
      "SET_CATEGORIES",
      "SET_PRODUCTS",
      "SET_PRODUCTS_FOR_YOU",
      "SET_CART_DATA",
      "SET_HAS_CART",
    ].includes(mutation.type),
});
