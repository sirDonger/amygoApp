import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class SignupUserDto {
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MaxLength(40)
  readonly lastname: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/) //small capital digit symbol
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/) //small capital digit symbol
  confirm_password: string;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  phoneNumber: string;
}
