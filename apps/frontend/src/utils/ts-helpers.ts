export function assertIsDefined<Type>(
  arg: Type | undefined,
  errorMessage: string
): asserts arg is Type {
  if (arg === undefined) throw new Error(errorMessage);
}
