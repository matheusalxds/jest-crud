const Database = require('../../../database/database');
const config = require('../../../database/db-config');

const User = require('../models/user');
const controller = require('../controllers/users');

const userData = require('../models/__mock__/user');
const usersData = require('../models/__mock__/users');

describe('User service', () => {
  describe('User controller', () => {
    let userController;
    let firstUser;

    // Starting server before all the tests
    beforeAll(async () => {
      await Database(config).connect();
    });

    // Cleaning up users from database
    beforeAll(async () => {
      await Database(config).schemaDeleteMany(User);
    });

    beforeAll(async () => {
      await User.insertMany(usersData);
    });

    // Initialize user controller
    beforeAll(async () => {
      userController = controller(User);
    });

    // Close server after finish the tests
    afterAll(async () => {
      await Database(config).disconnect();
    });

    it('should have a create user function', async () => {
      expect(typeof userController.createUser).toBe('function');
    });

    it('should create an user', async () => {
      firstUser = await userController.createUser(userData);
      const findUser = await User.findOne({ _id: firstUser._id });
      expect(firstUser.name).toBe(findUser.name);
      expect(firstUser.lastName).toBe(findUser.lastName);
      expect(firstUser.fullName).toBe(findUser.fullName);
      expect(firstUser.email).toBe(findUser.email);
    });

    it(`should throw an error if doesn't exist 'data'`, async () => {
      await expect(userController.createUser(null)).rejects.toBeTruthy();
    });

    it('should have a getUsers function', async () => {
      expect(typeof userController.getUsers).toBe('function');
    });

    it('should return all users with no arguments', async () => {
      const users = await userController.getUsers();
      expect(users.length).toBe(4);
    });

    it(`should return an user based on firstUser _id`, async () => {
      const found = await userController.getUsers({ _id: firstUser._id });
      expect(found).toBeTruthy();
    });

    it(`should return an user based on firstUser name`, async () => {
      const found = await userController.getUsers({ name: firstUser.name });
      expect(found).toBeTruthy();
    });

    it('should have an updateUser function', async () => {
      expect(typeof userController.updateUser).toBe('function');
    });

    it(`should update an user based on 'userId'`, async () => {
      const user = await userController.updateUser({ userId: firstUser._id, data: userData });
      expect(user.name).toBe(userData.name);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.fullName).toBe(userData.fullName);
      expect(user.email).toBe(userData.email);
    });

    it(`should throw error if there isn't any 'userId'`, async () => {
      await expect(userController.updateUser({ data: userData })).rejects.toBeTruthy();
    });

    it(`should throw an error if there isn't any 'data'`, async () => {
      await expect(userController.updateUser({ userId: firstUser._id })).rejects.toBeTruthy();
    });

    it(`should throw an error if there isn't any 'user'`, async () => {
      await expect(userController.updateUser({ userId: 'matheus', data: userData })).rejects.toBeTruthy();
    });

    it('should have a deleteUser function', async () => {
      expect(typeof userController.deleteUser).toBe('function');
    });

    it(`should delete an user based on 'userId'`, async () => {
      await expect(userController.deleteUser({ userId: firstUser._id })).resolves.toBeTruthy();
    });

    it(`should throw an error if 'userId' was not provided`, async () => {
      await expect(userController.deleteUser({ userId: null })).rejects.toBeTruthy();
    });
  });
});
