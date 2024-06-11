import Vue from "vue";
import Vuetify from "vuetify";

// import colors from "vuetify/lib/util/colors";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi",
  },

  // theme: {
  //   // dark: true,
  //   themes: {
  //     light: {
  //       primary: colors.green,
  //       secondary: colors.blue.lighten3,
  //       accent: colors.shades.black,
  //       error: colors.red.accent3,
  //     },
  //     dark: {
  //       primary: colors.red,
  //     },
  //   },
  // },
};

export default new Vuetify(opts);

/**
 * use dummy json apis
 *
 * login
 * auth user
 * refresh token
 *
 * products
 *
 * carts
 *
 * comments
 *
 * auth guards
 *
 * api service
 *
 * pagination
 *
 * data preservation
 *
 * form validation
 *
 */
