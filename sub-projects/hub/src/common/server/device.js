import Connection from './connection.js';
import OAuthManager from './oauth-manager.js';

/* eslint-disable import/prefer-default-export */
export async function setup() {
  await new Connection()
    .setDevice()
    .post()
    .setup()
    .params({
      refresh: OAuthManager.getRefresh(),
      access: OAuthManager.getAccess(),
      accessExpires: OAuthManager.getAccessExpires(),
      clientID: OAuthManager.getClientID(),
    })
    .call();
}
