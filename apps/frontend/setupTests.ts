import { setLogger } from 'react-query';

// Disable writing by react-query to console in tests
setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

const errorMessagesToSkip = [
  '[antd-mobile: Global] The px tester is not rendering properly. Please make sure you have imported `antd-mobile/es/global`.',
];
const warnMessagesToSkip = [
  '[antd-mobile: Form.Item] `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
];

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

global.console.error = jest.fn().mockImplementation((message, ...rest) => {
  if (errorMessagesToSkip.includes(message)) return;

  originalConsoleError(message, ...rest);
});

global.console.warn = jest.fn().mockImplementation((message, ...rest) => {
  if (warnMessagesToSkip.includes(message)) return;

  originalConsoleWarn(message, ...rest);
});

afterAll(() => {
  global.console.error = originalConsoleError;
  global.console.warn = originalConsoleWarn;
});
