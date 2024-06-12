import axios from "axios";

class AxiosAPI {
  constructor() {
    this.API = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * GET REQUEST
   *
   * @param {String} endpoint - the endpoint url
   * @param {Function} done - function to run after api response
   * @param {Object} headers - any additional headers
   * @returns {none}
   */
  async get(endpoint, done, headers) {
    try {
      const res = await this.API.get(endpoint, { headers });
      done(res);
    } catch (err) {
      done(err);
    }
  }

  /**
   * POST REQUEST
   *
   * @param {String} endpoint - the endpoint url
   * @param {Function} done - function to run after api response
   * @param {Object} payload - data needed to be passed in body of request
   * @param {Object} headers - any additional headers
   * @returns {none}
   */
  async post(endpoint, done, payload, headers) {
    try {
      const res = await this.API.post(endpoint, payload, { headers });
      done(res);
    } catch (err) {
      done(err);
    }
  }

  /**
   * PUT REQUEST
   *
   * @param {String} endpoint - the endpoint url
   * @param {Function} done - function to run after api response
   * @param {Object} payload - data needed to be passed in body of request
   * @param {Object} headers - any additional headers
   * @returns {none}
   */
  async put(endpoint, done, payload, headers) {
    try {
      const res = await this.API.put(endpoint, payload, { headers });
      done(res);
    } catch (err) {
      done(err);
    }
  }
}

export default new AxiosAPI();
