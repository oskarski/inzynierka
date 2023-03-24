export const apiMethodMock = <ApiMethodFnType extends (...args: any[]) => any>(
  apiMethodName: string
) =>
  jest
    .fn<ReturnType<ApiMethodFnType>, Parameters<ApiMethodFnType>>()
    .mockImplementation(() => {
      throw new Error(`Method "${apiMethodName}" missing mock implementation!`);
    });
