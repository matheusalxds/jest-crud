# POC - Using [Jest](https://jestjs.io/) + [Mongoose](https://mongoosejs.com/docs/guide.html)

#### Project developed to improve knowledge about tests

The project basically consists of:
- Creates connection with database with a db-config file.
- A simple intro module about Jest.
    - Basics about Jest.
    - An Example using mocked function.
- A simple coverage CRUD tests.
    - Creating a connection with database before all tests.
    - Closing the connection after all tests.
    - Cleaning up the created data after each test.
    
To run the tests:
```
yarn test
   or
yarn run test:watch (auto-reload)
```
To check code coverage:
```
yarn run test:coverage
```
Then you can check the statistics at
`./coverage/lcov-report/controller.js.html`.
(PS: You can open in your preferred browser)

The structure was thinking based on a Real Project System.
