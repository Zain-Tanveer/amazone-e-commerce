import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      /**
       * This is a navigation guard. It is used to check whether the token exists,
       * if it does and the user tries to access this route then the user is redirected back
       * to home page
       *
       * @param {Route} to - the target Route Object being navigated to.
       * @param {Route} from - the current route being navigated away from.
       * @param {NavigationGuardNext}  next - move on to the next hook in the pipeline
       * @returns {void}
       */
      beforeEnter(to, from, next) {
        // getting the token from store
        const hasToken = store.getters.getToken;

        // if user has a token
        if (hasToken) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/products",
      component: () => import("@/views/ProductsView.vue"),
      props: true,
      children: [
        {
          path: "",
          name: "all-products",
          component: () => import("@/components/ProductsList.vue"),
        },
        {
          path: ":category",
          name: "category-products",
          component: () => import("@/components/ProductsList.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/product/details/:id",
      name: "product-details",
      component: () => import("@/views/ProductDetailsView.vue"),
      props: true,
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      component: () => import("@/views/AdminView.vue"),
      meta: { requiresAuth: true },
      /**
       * This is a navigation guard. It is used to check whether the token exists and
       * if not then redirect user to home page
       *
       * @param {Route} to - the target Route Object being navigated to.
       * @param {Route} from - the current route being navigated away from.
       * @param {NavigationGuardNext}  next - move on to the next hook in the pipeline
       * @returns {void}
       */
      beforeEnter(to, from, next) {
        // getting the token from store
        const hasToken = store.getters.getToken;
        const user = store.getters.getUser;

        // if user has a token
        if (!hasToken || user.role !== "admin") {
          next({ name: "home" });
        } else {
          next();
        }
      },
      children: [
        {
          path: "",
          name: "admin",
          component: () => import("@/components/AdminDashboard.vue"),
          meta: { layout: "AdminLayout" },
        },
        {
          path: "products",
          name: "admin-products",
          component: () => import("@/components/AdminProducts.vue"),
          meta: { layout: "AdminLayout" },
        },
        {
          path: "products/create",
          name: "admin-products-create",
          component: () => import("@/components/AdminProductsCreate.vue"),
          meta: { layout: "AdminLayout" },
        },
        {
          path: "products/update/:product_id",
          name: "admin-products-update",
          component: () => import("@/components/AdminProductsUpdate.vue"),
          meta: { layout: "AdminLayout" },
          props: true,
        },
        {
          path: "users",
          name: "admin-users",
          component: () => import("@/components/AdminUsers.vue"),
          meta: { layout: "AdminLayout" },
        },
        {
          path: "account",
          name: "admin-account",
          component: () => import("@/components/AdminAccount.vue"),
          meta: { layout: "AdminLayout" },
        },
      ],
    },
  ],
});

/**
 * This is a global navigation guard. It is used to check whether the user is trying to access
 * a protected route without being logged in.
 *
 * @param {Route} to - the target Route Object being navigated to.
 * @param {Route} from - the current route being navigated away from.
 * @param {NavigationGuardNext} next - move on to the next hook in the pipeline
 * @returns {function}
 */
router.beforeEach((to, from, next) => {
  // if the route has a 'requiresAuth' property in meta tag then
  // check whether the user is has a token
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // getting token from store
    const hasToken = store.getters.getToken;

    // if user is not logged in then redirect user to login page.
    if (!hasToken) {
      next({ name: "login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
