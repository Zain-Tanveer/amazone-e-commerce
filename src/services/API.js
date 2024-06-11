import axios from "axios";

class AxiosAPI {
  constructor() {
    this.API = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  /* ---PRODUCT APIS---  */

  /**
   * This api will fetch all products
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getAllProducts(skip = 0, limit = 20) {
    return this.API.get(`/products?limit=${limit}&skip=${skip}`);
  }

  /**
   * This api will fetch product by id
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getProductById(id) {
    return this.API.get(`/products/${id}`);
  }

  /**
   * This api will fetch all products based on a category
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getCategoryProducts(category, skip = 0, limit = 20) {
    return this.API.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
  }

  /**
   * This api will fetch all products based on a search query
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getSearchProducts(search = "", skip = 0, limit = 10) {
    return this.API.get(`/products/search?q=${search}&limit=${limit}&skip=${skip}`);
  }

  /* ---CATEGORY APIS---  */

  /**
   * This api will fetch all product categories
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getAllCategories() {
    return this.API.get(`/products/categories`);
  }

  /* ---CART APIS---  */

  /**
   * This api will fetch cart for a specific user
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getCartByUser(payload) {
    return this.API.get(`/carts/user/${payload.id}`);
  }

  /**
   * This api will create a new cart
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  createCart(payload) {
    const headers = { "Content-Type": "application/json" };

    return this.API.post("/carts/add", payload, { headers });
  }

  /**
   * This api will update an existing cart
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  updateCart(payload) {
    const headers = { "Content-Type": "application/json" };

    return this.API.put(`/carts/${payload.cart_id}`, payload.data, { headers });
  }

  /* ---USER APIS---  */

  /**
   * This api will login user and return appropriate credentials
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  loginUser(payload) {
    const headers = {
      "Content-Type": "application/json",
    };

    // // sets the token expiration time to 1 minute
    // // useful for testing
    // payload.expiresInMins = 1;

    return this.API.post("/auth/login", payload, { headers });
  }

  /**
   * This api will authenticate user based on provided token
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  authenticateUser(payload) {
    const headers = {
      Authorization: `Bearer ${payload.token}`,
    };

    return this.API.get("/auth/me", { headers });
  }

  /**
   * This api will refresh expired token
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  refreshSession(payload) {
    const headers = {
      "Content-Type": "application/json",
    };

    return this.API.post("/auth/refresh", { refreshToken: `${payload.token}` }, { headers });
  }
}

export default new AxiosAPI();
