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
  name: string;

  @IsString()
  @MaxLength(40)
  surname: string;

  profileImage: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  confirm_password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  phoneNumber: string;
}
