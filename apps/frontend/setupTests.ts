const errorMessagesToSkip = [
  '[antd-mobile: Global] The px tester is not rendering properly. Please make sure you have imported `antd-mobile/es/global`.',
];

const originalConsoleError = console.error;

global.console.error = jest.fn().mockImplementation((message, ...rest) => {
  if (errorMessagesToSkip.includes(message)) return;

  originalConsoleError(message, ...rest);
});

afterAll(() => {
  global.console.error = originalConsoleError;
});
