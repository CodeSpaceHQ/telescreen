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
const InvalidSessionError = errorFactory('Invalid session token.', 401);

const ExistingAccountError = errorFactory('Account with that email address already exists.', 400);

const MissingParametersError = errorFactory('Required parameters not found.', 400);

const MaxRetriesError = errorFactory('Max number of retries exceeded for operation.', 500);

const ClientNotFoundError = errorFactory('Account with that email address already exists.', 400);

module.exports = {
  errorFactory,
  InvalidLoginInfoError,
  InvalidSessionError,
  ExistingAccountError,
  MissingParametersError,
  MaxRetriesError,
  ClientNotFoundError,
};
