export interface IUser {
  readonly id: number;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly confirm_pass: string;
}
