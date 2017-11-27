import Connection from './connection.js';
import OAuthManager from './oauth-manager.js';

/* eslint-disable import/prefer-default-export */
export async function login(email, password) {
  if (OAuthManager.getRefresh()) {
    await OAuthManager.confirmAccess();

    return {
      access: OAuthManager.getAccess(),
      accessExpires: OAuthManager.getAccessExpires(),
      refresh: OAuthManager.getRefresh(),
    };
  }

  const res = await new Connection()
    .post()
    .oauth()
    .token()
    .params({
      username: email,
      password,
      grant_type: 'password',
      client_id: OAuthManager.getClientID(),
    })
    .call();

  OAuthManager.setAccess(res.accessToken);
  OAuthManager.setAccessExpires(res.accessTokenExpiresAt);
  OAuthManager.setRefresh(res.refreshToken);

  return {
    access: res.accessToken,
    accessExpires: res.accessTokenExpiresAt,
    refresh: res.refreshToken,
  };
}
