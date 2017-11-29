import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * The connection information for the server hosting the API.
 *
 * @param {string} baseURL - Base URL including the /api endpoint
 * @param {number} timeout - Time in ms that each call should take
 */
const instance = axios.create({
  baseURL: HUB_URL,
  timeout: 5000,
});

const deviceInstance = axios.create({
  baseURL: CLIENT_URL,
  timeout: 5000,
});

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
    };

    this.isDevice = false;
    this.url = '/';
    this.method = 'get';
  }

  setDevice() {
    this.isDevice = true;
    return this;
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

  setup() { return this.replaceURL('/setup'); }

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
    const params = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      params.append(key, query[key]);
    });

    this.config.data = params.toString();
    return this;
  }

  call() {
    this.config.method = this.method;
    this.config.url = this.url;

    if (this.isDevice === false) {
      return instance(this.config).then(res => res.data);
    }

    return deviceInstance(this.config).then(res => res.data);
  }
}
