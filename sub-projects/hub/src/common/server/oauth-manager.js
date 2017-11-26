import Connection from './connection.js';

class OAuthManager {
  constructor() {
    this.refreshKey = 'refresh';
    this.accessKey = 'access';
    this.accessExpiresKey = 'accessExpires';
    this.clientIDKey = 'clientID';
    this.clientRedirectKey = 'clientRedirect';
  }

  async refreshToken() {
    const res = await new Connection()
      .post()
      .oauth()
      .token()
      .data({
        grant_type: 'refresh_token',
        refresh_token: this.getRefresh(),
        client_id: this.getClientID(),
      })
      .call();

    this.setAccess(res.accessToken);
    this.setAccessExpires(res.accessTokenExpiresAt);

    return {
      access: res.accessToken,
      accessExpires: res.accessTokenExpiresAt,
    };
  }

  async confirmAccess() {
    if (new Date() > new Date(this.getAccessExpires())) {
      await this.refreshToken();
    }
  }

  getRefresh() {
    return localStorage.getItem(this.refreshKey);
  }

  setRefresh(refresh) {
    localStorage.setItem(this.refreshKey, refresh);
  }

  getAccess() {
    return localStorage.getItem(this.accessKey);
  }

  setAccess(access) {
    localStorage.setItem(this.accessKey, access);
  }

  getAccessExpires() {
    return localStorage.getItem(this.accessExpiresKey);
  }

  setAccessExpires(accessExpires) {
    localStorage.setItem(this.accessExpiresKey, accessExpires);
  }

  getClientID() {
    return localStorage.getItem(this.clientIDKey);
  }

  setClientID(clientID) {
    localStorage.setItem(this.clientIDKey, clientID);
  }

  getClientRedirect() {
    return localStorage.getItem(this.clientRedirectKey);
  }

  setClientRedirect(clientRedirect) {
    localStorage.setItem(this.clientRedirectKey, clientRedirect);
  }
}

export default new OAuthManager();
