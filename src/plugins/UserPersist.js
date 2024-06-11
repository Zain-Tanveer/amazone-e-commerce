import VuexPersistence from "vuex-persist";

/**
 * VuexPersistance object used to persist vuex state in local storage
 *
 * @param {PersistOptions}
 */
export const userLocal = new VuexPersistence({
  key: "userData", // sets key to userData
  storage: window.localStorage, // which storage to use

  // restores the saved local storage data
  restoreState: (key, storage) => {
    const storedState = JSON.parse(storage.getItem(key));
    return { userModule: { ...storedState } } || {};
  },

  reducer: (state) => ({
    user: state.userModule.user,
    token: state.userModule.token,
    refreshToken: state.userModule.refreshToken,
  }),

  // will only update the local storage if one of these mutations fire
  filter: (mutation) => ["SET_USER", "SET_TOKEN", "SET_REFRESH_TOKEN"].includes(mutation.type),
});
