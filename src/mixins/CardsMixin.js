/**
 * This mixin is used by CardList.vue and CardGrid.vue
 */
export const CardMixin = {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /**
     * Computed property to get the reviews[] array length of a product
     *
     * @param {none}
     * @returns {Number} - product reviews length
     */
    totalReviews() {
      console.log(this.product);
      return this.product.reviews.length;
    },

    /**
     * Computed property to check if a product has discount percentage
     *
     * @param {none}
     * @returns {Boolean} - true/false based on discount percentage
     */
    hasDiscount() {
      return this.product.discountPercentage ? true : false;
    },

    /**
     * Computed property to get the product price based on discount percentage
     *
     * @param {none}
     * @returns {Number} - products actual or discounted price
     */
    productPrice() {
      // if product has no discount percentage
      if (!this.product.discountPercentage) {
        return this.product.price;
      }

      // Convert the discount percentage to a decimal
      const discountDecimal = this.product.discountPercentage / 100;
      // Calculate the discount amount
      const discountAmount = this.product.price * discountDecimal;
      // Calculate the discounted price
      const discountedPrice = this.product.price - discountAmount;

      return discountedPrice.toFixed(2);
    },
  },
};
