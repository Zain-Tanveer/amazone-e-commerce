<template>
  <v-form ref="form" v-model="valid">
    <v-row>
      <!-- ---PRODUCT INFORMATION--- -->
      <admin-base-card title="Product Information">
        <!-- product title -->
        <admin-base-input
          label="Product Title"
          v-model="product.title"
          :counter="70"
          :rules="productTitleRules"
          placeholder="Enter product title"
          required
        ></admin-base-input>

        <!-- product category -->
        <admin-base-input label="Category" required>
          <template #input-field>
            <v-select
              v-model="product.category"
              :items="allCategoryNames"
              :rules="productCategoryRules"
              placeholder="Please select a category"
              :selected="product.category"
              dense
              required
            ></v-select>
          </template>
        </admin-base-input>

        <!-- product brand -->
        <admin-base-input
          label="Brand"
          v-model="product.brand"
          :rules="productBrandRules"
          placeholder="Enter brand"
          required
        ></admin-base-input>
      </admin-base-card>

      <!-- ---PRODUCT DETAILS--- -->
      <admin-base-card title="Product Details">
        <!-- product tags -->
        <admin-base-input label="Tags">
          <template #input-field>
            <v-select
              v-model="product.tags"
              :items="allCategoryNames"
              placeholder="Select tags"
              hint="*You can select multiple tags"
              persistent-hint
              dense
              multiple
              chips
            ></v-select>
          </template>
        </admin-base-input>

        <!-- product description -->
        <admin-base-input label="Description">
          <template #input-field>
            <v-textarea
              v-model="product.description"
              color="secondary"
              placeholder="Enter product description..."
              filled
            ></v-textarea>
          </template>
        </admin-base-input>

        <!-- product warranty -->
        <admin-base-input
          v-model="product.warrantyInformation"
          label="Warranty"
          placeholder="Enter warranty"
        ></admin-base-input>
      </admin-base-card>
    </v-row>

    <!-- ---FORM ACTIONS--- -->
    <v-card-actions class="mt-5 mx-5">
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="3">
          <v-btn color="secondary" block @click="resetForm"> Reset </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
            color="primary"
            block
            :loading="fetching"
            :disabled="valid ? false : true"
            @click="handleFormSubmit"
          >
            {{ buttonText }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { productRules } from "@/utils/validations.js";

import API from "@/services/API.js";

export default {
  name: "AdminProductForm",

  components: {
    AdminBaseCard: () => import("@/components/AdminBaseCard.vue"),
    AdminBaseInput: () => import("@/components/AdminBaseInput.vue"),
  },

  props: {
    updateProduct: {
      type: Object,
    },
  },

  /**
   * 'created' lifecycle hook to fetch categories if allCategoryNames[] is empty
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    if (!this.allCategoryNames.length) {
      this.fetchCategories();
    }

    // if updateProduct exists i.e., if it is passed as props then set
    // the product object values with the updateProduct values
    if (this.updateProduct) {
      this.product = { ...this.updateProduct };
      this.product.id = String(this.product.id);
    }
  },

  data() {
    return {
      product: {
        title: "",
        category: "",
        brand: "",
        tags: [],
        description: "",
        warrantyInformation: "",
      },

      fetching: false,
      valid: false,
    };
  },

  computed: {
    ...mapGetters(["allCategoryNames"]),

    /**
     * Computed properties to get validation rules
     *
     * @param {none}
     * @returns {none}
     */
    productTitleRules: () => productRules.PRODUCT_TITLE_RULES,
    productCategoryRules: () => productRules.PRODUCT_CATEGORY_RULES,
    productBrandRules: () => productRules.PRODUCT_BRAND_RULES,

    /**
     * Computed property to check if the form is in
     * AdminProductsCreate.vue or AdminProductsUpdate.vue
     *
     * @param {none}
     * @returns {none}
     */
    isCreate() {
      return this.updateProduct ? false : true;
    },

    /**
     * Computed property to get the text of button
     *
     * @param {none}
     * @returns {none}
     */
    buttonText() {
      return this.isCreate ? "Save" : "Update";
    },

    /**
     * Computed property to get success message based on isCreate
     *
     * @param {none}
     * @returns {none}
     */
    successMessage() {
      return this.isCreate ? "Product added successfully!" : "Product updated successfully!";
    },
  },

  methods: {
    ...mapActions(["fetchCategories"]),
    ...mapMutations(["SET_SNACKBAR"]),

    /**
     * Function to reset the form values
     *
     * @param {none}
     * @returns {void}
     */
    resetForm() {
      this.$refs.form.reset();
    },

    /**
     * Function to handle form submit
     *
     * @param {none}
     * @returns {void}
     */
    async handleFormSubmit() {
      this.fetching = true;

      if (this.isCreate) {
        await API.post("/products/add", this.done, this.product);
      } else {
        await API.put(`/products/${this.updateProduct.id}`, this.done, this.product);
      }

      this.fetching = false;
    },

    /**
     * Function that is passed as parameter in api call
     *
     * @param {Object} res - contains the api response or error
     * @returns {void}
     */
    done(res) {
      if (res?.status === 200) {
        this.SET_SNACKBAR({ message: this.successMessage, type: "success" });
      } else if (res?.status === 201) {
        this.resetForm();
        this.SET_SNACKBAR({ message: this.successMessage, type: "success" });
      } else {
        this.SET_SNACKBAR({ message: "Something went wrong!", type: "error" });
      }
    },
  },
};
</script>

<style></style>
