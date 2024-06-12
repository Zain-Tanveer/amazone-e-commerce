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
};
