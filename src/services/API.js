import axios from "axios";

class AxiosAPI {
  constructor() {
    this.API = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   *
   *
   * @param {String} endpoint
   * @param {Function} done
   * @param {Object} headers
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
   *
   *
   * @param {String} endpoint
   * @param {Function} done
   * @param {Object} payload
   * @param {Object} headers
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
   *
   *
   * @param {String} endpoint
   * @param {Function} done
   * @param {Object} payload
   * @param {Object} headers
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
