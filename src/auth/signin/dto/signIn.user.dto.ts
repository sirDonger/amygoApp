import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
