const Random = require('meteor-random');

const Database = require('../../../database/database');
const config = require('../../../database/db-config');

const User = require('../models/user');
const controller = require('../controllers/users');

const __mock = require('../models/__mock__/user');

describe('User service', () => {
  describe('User controller', () => {
    let data;
    let userController;
    let lastCreatedId;

    // Starting server before all the tests
    beforeAll(async () => {
      await Database(config).connect();
    });

    // Initialize user controller
    beforeAll(async () => {
      userController = controller(User);
    });

    // Cleaning up users from database
    beforeAll(async () => {
      await Database(config).schemaDeleteMany(User);
    });

    // Populate the obj
    beforeAll(() => {
      data = __mock;
    });

    // Close server after finish the tests
    afterAll(async () => {
      await Database(config).disconnect();
    });

    it('should create an user', async () => {
      const newUser = await userController.createUser(data);
      // to remove version key
      newUser.__v = undefined;
      expect(newUser.toJSON()).toEqual(data);
    });

    // it('should throw an error because doesn\'t exists data', async () => {
    //   try {
    //     const newObj = Object.assign(data, { _id: Random.id(), email: 'matheus@gmail.com' });
    //     newObj.name = undefined;
    //     await userController.createUser(data);
    //   } catch (e) {
    //     expect(e).toBeTruthy();
    //   }
    // });

    it('should return all users', async () => {
      lastCreatedId = Random.id();
      const newObj = Object.assign(data, { _id: lastCreatedId, email: 'matheus@gmail.com' });
      // add new user
      await userController.createUser(newObj);
      const users = await userController.getUsers();
      expect(users.length).toBe(2);
    });

    it('should return an user with _id equals bbb', async () => {
      const users = await userController.getUsers({ _id: lastCreatedId });
      expect(users.length).toBe(1);
    });
  });
});
