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
MONGODB_URI=mongodb://localhost:27017/test

SECRET=thisisoursecret
SALT=10

INIT_USERNAME=test@ttu.edu
INIT_PASSWORD=test
```

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
