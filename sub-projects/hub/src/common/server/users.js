import Connection from './connection.js';
import OAuthManager from './oauth-manager.js';

/* eslint-disable import/prefer-default-export */
export async function createUser(email) {
  await OAuthManager.confirmAccess();

  const res = await new Connection()
    .post()
    .users()
    .params({
      access_token: OAuthManager.getAccess(),
      email,
    })
    .call();

  return {
    uid: res.uid,
  };
}
