# POC - Using [Jest](https://jestjs.io/) + [Mongoose](https://mongoosejs.com/docs/guide.html)
<p align="left">
  <img alt = "Última confirmação do Github" src = "https://img.shields.io/github/last-commit/matheusalxds/jest-examples">
  <img alt = "Idioma principal do GitHub" src = "https://img.shields.io/github/languages/top/matheusalxds/jest-examples">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/matheusalxds/jest-examples?color=%2304D361">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/matheusalxds/jest-examples/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/matheusalxds/jest-examples?style=social">
  </a>
</p>
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

To install the project dependencies, you'll need to run the following command:
```
npm install
    or
yarn install
```
    
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
