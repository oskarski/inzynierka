export const apiMethodMock = <ApiMethodFnType extends (...args: any[]) => any>(
  apiMethodName: string
) =>
  jest
    .fn<ReturnType<ApiMethodFnType>, Parameters<ApiMethodFnType>>()
    .mockImplementation(() => {
      console.error(`Method "${apiMethodName}" missing mock implementation!`);

      throw new Error(`Method "${apiMethodName}" missing mock implementation!`);
    });
