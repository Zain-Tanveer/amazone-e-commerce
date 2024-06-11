import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import store from "./store";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import vuetify from "@/plugins/vuetify";

import "./assets/css/style.css";

Vue.use(Toast);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
