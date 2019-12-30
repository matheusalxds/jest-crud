const logger = require('../../../utils/logger');

class Controller {
  constructor(User) {
    this.User = User;
  }

  async createUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = new this.User(data);
        await newUser.save();
        return resolve(newUser);
      } catch (e) {
        return reject(e);
      }
    });
  }

  async getUsers(filter = {}) {
    return new Promise(async (resolve) => {
      const query = {};
      const { _id, name } = filter;

      if (_id) query._id = _id;
      if (name) query.name = name;

      const users = await this.User.find(query);
      logger.info(`FOUND ${users.length} users`);

      return resolve(users);
    });
  }
}

module.exports = function (User) {
  return new Controller(User);
};
