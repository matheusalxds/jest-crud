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
    const _id = 'matheusalxds';
    const tmpData = { name: 'Matheus EDITADO WO' };

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

    it(`should throw an error because doesn't exists 'data'`, async () => {
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

    it(`should return an user with _id = 'matheusalxds'`, async () => {
      const users = await userController.getUsers({ _id });
      expect(users.length).not.toBeNull();
    });

    it(`should return an user with name = 'Matheus'`, async () => {
      const name = 'Matheus';
      const users = await userController.getUsers({ name });
      expect(users.length).not.toBeNull();
    });

    it(`should update an user based on 'userId'`, async () => {
      const user = await userController.updateUser({ userId: _id, data: tmpData });
      expect(user.name).toBe(tmpData.name);
    });

    it(`should throw error if there isn't any 'userId'`, async () => {
      await expect(userController.updateUser({ data: tmpData })).rejects.toBeTruthy();
    });

    it(`should throw an error if there isn't any 'data'`, async () => {
      await expect(userController.updateUser({ userId: _id })).rejects.toBeTruthy();
    });

    it(`should throw an error if there isn't any 'user'`, async () => {
      await expect(userController.updateUser({ userId: 'matheus', data: tmpData })).rejects.toBeTruthy();
    });

    it(`should delete an user based on 'userId'`, async () => {
      await expect(userController.deleteUser({ userId: 'matheusalxds' })).resolves.toBeTruthy();
    });

    it(`should throw an error if 'userId' was not provided`, async () => {
      await expect(userController.deleteUser({ userId: null })).rejects.toBeTruthy();
    });
  });
});
