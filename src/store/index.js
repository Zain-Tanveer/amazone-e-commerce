import Vue from "vue";
import Vuex from "vuex";

import userModule from "./modules/user";
import productsModule from "./modules/products";
import categoriesModule from "./modules/categories";
import cartModule from "./modules/cart";

import snackbarModule from "./modules/snackbar";

import { stateLocal } from "@/plugins/StatePersist.js";
import { userLocal } from "@/plugins/UserPersist.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    userModule,
    productsModule,
    categoriesModule,
    cartModule,

    snackbarModule,
  },

  plugins: [stateLocal.plugin, userLocal.plugin],
});
