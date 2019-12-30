const mongoose = require('mongoose');
const logger = require('../utils/logger');

class Connection {
  constructor({ url, options }) {
    this.url = url;
    this.options = options;
  }

  async connect() {
    mongoose.set('useCreateIndex', true);
    mongoose.promise = global.Promise;
    await mongoose.connect(this.url, { ...this.options });
    logger.info('Server was opened!');
  }

  async disconnect() {
    await mongoose.disconnect();
    logger.info('Server was closed!');
  }

  async schemaDeleteMany(Schema) {
    await Schema.deleteMany();
  }
}

module.exports = function (obj) {
  return new Connection(obj);
};
