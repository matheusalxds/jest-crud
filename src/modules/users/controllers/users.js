class Controller {
  constructor(User) {
    this.User = User;
  }

  async createUser(data) {
    return new Promise(async (resolve, reject) => {
      // if (!data) {
      //   return reject(new Error);
      // }
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
      return resolve(users);
    });
  }

  async updateUser({ userId, data }) {
    return new Promise(async (resolve, reject) => {
      if (!userId || !data) {
        return reject(new Error);
      }

      const user = await this.User.findById(userId);
      if (!user) {
        return reject(new Error);
      }

      Object.assign(user, data);
      await user.save();

      return resolve(user);
    });
  }

  async deleteUser({ userId }) {
    return new Promise(async (resolve, reject) => {
      if (!userId) {
        return reject(new Error);
      }
      const response = await this.User.deleteMany();
      return resolve(response);
    });
  }
}

module.exports = function (User) {
  return new Controller(User);
};
