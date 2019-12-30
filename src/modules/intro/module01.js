const module01 = {
  func1: (a) => a + 1,
  func2: (a, cb) => a + cb(),
  func3: (msg, alert) => alert(msg),
};

module.exports = module01;

