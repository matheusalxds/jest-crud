const faker = require('faker');

const Database = require('../../../database/database');
const config = require('../../../database/db-config');

const User = require('../models/user');
const controller = require('../controllers/users');

const __mock = require('../models/__mock__/user');

describe('User service', () => {
  describe('User controller', () => {
    let userController;
    let mockUserData;

    // Starting server before all the tests
    beforeAll(async () => {
      await Database(config).connect();
    });

    // Cleaning up users from database
    beforeAll(async () => {
      await Database(config).schemaDeleteMany(User);
    });

    // Initialize user controller
    beforeAll(async () => {
      userController = controller(User);
    });

    // Populate the obj
    beforeEach(() => {
      mockUserData = jest.fn().mockReturnValue(__mock);
    });

    // Close server after finish the tests
    afterAll(async () => {
      await Database(config).disconnect();
    });

    it('should create an user', async () => {
      const newUser = await userController.createUser(mockUserData());
      // to remove version key
      newUser.__v = undefined;
      expect(newUser.toJSON()).toEqual(mockUserData());
    });

    it('should throw an error because doesn\'t exists data', async () => {
      try {
        await userController.createUser(null);
      } catch (e) {
        expect(e).toBeTruthy();
      }
    });

    it('should return all users', async () => {
      // add new user
      for (let i = 0; i < 10; i++) {
        await userController.createUser({
          ...mockUserData(),
          _id: undefined,
          name: faker.name.firstName(),
          lastName: faker.name.lastName(),
          fullName: faker.name.findName(),
          email: faker.internet.email(),
        });
      }

      const users = await userController.getUsers();
      const usersByModel = await User.find({});
      expect(users.length).toBe(usersByModel.length);
    });

    it('should return an user with _id = matheusalxds', async () => {
      const _id = 'matheusalxds';
      const users = await userController.getUsers({ _id });
      expect(users.length).not.toBeNull();
    });

    it('should return an user with name = matheus', async () => {
      const name = 'Matheus';
      const users = await userController.getUsers({ name });
      expect(users.length).not.toBeNull();
    });
  });
});
