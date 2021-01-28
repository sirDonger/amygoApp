import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ValidationMessagesEnum } from '../../../../constants/messagesEnum';
import { MatchTwoFields } from '../../../../helpers/validators/matchTwoField.decorator';

export class SignupUserDto {
  @IsString({ message: ValidationMessagesEnum.NAME })
  @MaxLength(30, { message: ValidationMessagesEnum.NAME })
  name: string;

  @IsString()
  @MaxLength(40)
  surname: string;

  @IsString()
  @IsOptional()
  profileImage: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
    message: ValidationMessagesEnum.EMAIL,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message: ValidationMessagesEnum.PASSWORD,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MatchTwoFields('password')
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message:
      ValidationMessagesEnum.PASSWORD + ValidationMessagesEnum.CONFIRM_PASSWORD,
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  emergencyContact: string;
}
