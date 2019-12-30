module.exports = {
  url: `mongodb://127.0.0.1/jestTest`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  sets: {
    createIndexes: true,
  },
};
