import Connection from './connection.js';
import OAuthManager from './oauth-manager.js';

export async function authorize(state) {
  await OAuthManager.confirmAccess();

  const res = await new Connection()
    .post()
    .oauth()
    .authorize()
    .data({
      access_token: OAuthManager.getAccess(),
      state,
      response_type: 'code',
      client_id: OAuthManager.getClientID(),
    })
    .call();

  return {
    code: res.authorizationCode,
    codeExpires: res.expiresAt,
  };
}

export async function token(code) {
  const res = await new Connection()
    .post()
    .oauth()
    .token()
    .data({
      code,
      grant_type: 'authorization_code',
      client_id: OAuthManager.getClientID(),
      redirect_uri: OAuthManager.getClientRedirect(),
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

export async function createClient(options) {
  if (OAuthManager.getClientID() && OAuthManager.getClientRedirect()) {
    return {
      clientID: OAuthManager.getClientID(),
      clientRedirect: OAuthManager.getClientRedirect(),
    };
  }

  const res = await new Connection()
    .post()
    .oauth()
    .client()
    .params({
      redirectURL: options.redirectURL,
      email: options.email,
      name: options.name,
    })
    .call();

  OAuthManager.setClientID(res.clientId);
  OAuthManager.setClientRedirect(options.redirectURL);

  return {
    clientID: res.clientId,
    clientRedirect: options.redirectURL,
  };
}
