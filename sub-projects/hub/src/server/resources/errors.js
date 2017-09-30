function errorFactory(newMessage, newStatus) {
  return class extends Error {
    constructor(args) {
      super(args);

      this.message = newMessage;
      this.status = newStatus;
    }
  };
}

const InvalidLoginInfoError = errorFactory('Invalid username/password.', 401);

module.exports = {
  InvalidLoginInfoError,
};
