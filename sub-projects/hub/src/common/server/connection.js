import axios from 'axios';

/**
 * The connection information for the server hosting the API.
 *
 * @param {string} baseURL - Base URL including the /api endpoint
 * @param {number} timeout - Time in ms that each call should take
 */
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 5000,
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * This class allows for easy building of a request to the API.
 *
 * @example
 * new Connection()
 *  .post()
 *  .users()
 *  .data(newUser)
 *  .call(() => {
 *    console.log('Connection succeeded!');
 *   }, () => {
 *    console.log('Connection failed!');
 *   });
 */
export default class Connection {
  constructor() {
    this.config = {
      data: {},
      params: {},
    };

    this.url = '/';
    this.method = 'get';
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  replaceURL(url) {
    this.url = url;
    return this;
  }

  pushURL(url) {
    this.url += url;
    return this;
  }

  post() { return this.setMethod('post'); }

  del() { return this.setMethod('delete'); }

  put() { return this.setMethod('put'); }

  get() { return this.setMethod('get'); }

  users() { return this.replaceURL('/users'); }

  oauth() { return this.replaceURL('/oauth'); }

  token() { return this.pushURL('/token'); }

  authorize() { return this.pushURL('/authorize'); }

  client() { return this.pushURL('/client'); }

  /**
   * Sets the body of the request object
   *
   * @param {Object} body
   * @returns {Connection}
   */
  data(body) {
    Object.keys(body).forEach((key) => {
      this.config.data[key] = body[key];
    });
    return this;
  }

  /**
   * Sets the query parameters of the request object
   *
   * @param query
   * @returns {Connection}
   */
  params(query) {
    Object.keys(query).forEach((key) => {
      this.config.params[key] = query[key];
    });
    return this;
  }

  call() {
    this.config.method = this.method;
    this.config.url = this.url;

    return instance(this.config);
  }
}
