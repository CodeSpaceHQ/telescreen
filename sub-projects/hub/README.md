# Hub Server Console App

## Development

### Environment

- Node.js: 8.5.0
- Yarn package manager: 1.0.2
- NPM: 5.3.0
- MongoDB: 3.4
- Git
- Postman

### Set Up Project

1. Install the required tools
2. Clone the repository
3. Run `yarn install` to get project dependencies
4. Add a `.env` file to `sub-projects/hub` with the following contents (for development purposes):

```
PORT=3000
PROD_MONGODB_URI=mongodb://127.0.0.1:27017/telescreen-prod
DEV_MONGODB_URI=mongodb://127.0.0.1:27017/telescreen-dev
TEST_MONGODB_URI=mongodb://127.0.0.1:27017/telescreen-test

SECRET=thisisoursecret
SALT=10

INIT_USERNAME=test@ttu.edu
INIT_PASSWORD=test

EMAIL_ADDRESS=an.example.email@gmail.com
EMAIL_PASSWORD=anexamplepassword
```

Note: the email address and password will not work.
You should provide another if you want `nodemailer` to function.

### Test Changes

#### Back-End

1. Run `mongod` to start the MongoDB server
2. Run `yarn run dev-server` from the project directory
3. Use Postman to test the API

#### Front-End

1. Run `mongod` to start the MongoDB server
2. Run `yarn run dev` from the project directory
3. Go to `127.0.0.1:8080` in your browser

Hot reloading is enabled, so changes that you make should be added automatically.

#### Client Server

1. Run `mongod` to start the MongoDB server
2. Run `yarn run dev` and `yarn run dev-client` from the project directory
3. Go to `127.0.0.1:8081` in your browser

## Notes

- If you need to mess around with the URLs the code hits when making requests, you'll have to modify `Telescreen\sub-projects\hub\webpack\values.js`.
- The final product of the device setup server is `Telescreen\sub-projects\device\oauth.txt`. This contains the refresh token, access token, access token expiration date, and client id. You'll have to pass the access token to protected endpoints.
