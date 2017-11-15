import Connection from './connection.js';

export function login(email, password) {
  return new Promise((resolve, reject) => {
    const onSuccess = (res) => {
      resolve(res.user);
    };

    new Connection()
      .post()
      .auth()
      .data({ email, password })
      .call(onSuccess, reject);
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    const onSuccess = () => {
      resolve();
    };

    new Connection()
      .del()
      .auth()
      .call(onSuccess, reject);
  });
}
