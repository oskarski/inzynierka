export type UserId = string & { readonly __type: unique symbol };

export interface ISignUpDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}
