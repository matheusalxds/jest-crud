const faker = require('faker');

const Database = require('../../../database/database');
const config = require('../../../database/db-config');

const User = require('../models/user');
const controller = require('../controllers/users');

const __mock = require('../models/__mock__/user');

describe('User service', () => {
  describe('User controller', () => {
    let userController;
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

    // Close server after finish the tests
    afterAll(async () => {
      await Database(config).disconnect();
    });

    it('should have a create user function', async () => {
      expect(typeof userController.createUser).toBe('function');
    });

    it('should create an user', async () => {
      const newUser = await userController.createUser(__mock);
      // to remove version key
      newUser.__v = undefined;
      expect(newUser.toJSON()).toEqual(__mock);
    });

    it(`should throw an error because doesn't exist 'data'`, async () => {
      await expect(userController.createUser(null)).rejects.toBeTruthy();
    });

    it('should have a getUsers function', async () => {
      expect(typeof userController.getUsers).toBe('function');
    });

    it('should return all users with no arguments', async () => {
      const spy = jest.spyOn(userController, 'getUsers');
      await userController.getUsers();
      expect(spy).toHaveBeenCalledWith();
    });

    it('should return all users passing an empty object', async () => {
      const spy = jest.spyOn(userController, 'getUsers');
      await userController.getUsers({});
      expect(spy).toHaveBeenCalledWith({});
    });

    it(`should return an user with some _id`, async () => {
      const spy = jest.spyOn(userController, 'getUsers');
      const _id = 'someId';
      await userController.getUsers({ _id });
      expect(spy).toHaveBeenCalledWith({ _id });
    });

    it(`should return an user with name = 'Matheus'`, async () => {
      const spy = jest.spyOn(userController, 'getUsers');
      const name = 'Matheus';
      await userController.getUsers({ name });
      expect(spy).toHaveBeenCalledWith({ name });
    });

    it('should have an updateUser function', async () => {
      expect(typeof userController.updateUser).toBe('function');
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

    it('should have a deleteUser function', async () => {
      expect(typeof userController.deleteUser).toBe('function');
    });

    it(`should delete an user based on 'userId'`, async () => {
      await expect(userController.deleteUser({ userId: 'matheusalxds' })).resolves.toBeTruthy();
    });

    it(`should throw an error if 'userId' was not provided`, async () => {
      await expect(userController.deleteUser({ userId: null })).rejects.toBeTruthy();
    });
  });
});
