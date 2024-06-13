const USERNAME_RULES = [(v) => !!v || "Username is required"];
const PASSWORD_RULES = [
  (v) => !!v || "Password is required",
  (v) => v?.length >= 6 || "Password must be greater than 6 characters",
];

const PRODUCT_TITLE_RULES = [
  (v) => !!v || "Product title is required",
  (v) => v?.length <= 70 || "Product title must be less than 70 characters",
];
const PRODUCT_CATEGORY_RULES = [(v) => !!v || "Category is required"];
const PRODUCT_BRAND_RULES = [(v) => !!v || "Brand is required"];

/* login rules */
export const loginRules = {
  USERNAME_RULES,
  PASSWORD_RULES,
};

/* product rules */
export const productRules = {
  PRODUCT_TITLE_RULES,
  PRODUCT_CATEGORY_RULES,
  PRODUCT_BRAND_RULES,
};
