import { MaxLength, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MaxLength(40)
  readonly lastName: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  readonly phoneNumber: string;
}
