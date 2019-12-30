const module01 = require('./module01');

describe('Module 01', () => {
  let mockFunc;

  // Creates an mock function
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('should sum current value + 1', () => {
    const { func1 } = module01;
    expect(func1(10)).toBe(11);
  });

  it('should sum the values correctly', () => {
    const { func2 } = module01;
    /**
     * Using Jest to mock a function
     * we can say what the value it should to return
     */
    const cb = mockFunc.mockReturnValue(1);
    expect(func2(10, cb)).toBe(11);

    /**
     * To verify if the method was called
     * console.log(cb.mock.calls)
     * and to validate if the fn was called, we can use
     * expect(cb.mock.calls[0][0]).toBe(1); = returns true
     */
  });

  it('should display the message in alert function', () => {
    const alertMock = jest.fn();
    const msg = 'Message';
    const { func3 } = module01;
    func3(msg, alertMock);
    expect(alertMock.mock.calls[0][0]).toBe(msg);
  });

  // it('func4');
});
