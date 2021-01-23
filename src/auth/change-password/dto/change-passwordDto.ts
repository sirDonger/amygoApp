import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  readonly newPassword: string;
}
