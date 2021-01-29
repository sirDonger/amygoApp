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
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @IsString({ message: ValidationMessagesEnum.NAME })
  @MaxLength(30, { message: ValidationMessagesEnum.NAME })
  @ApiProperty({
    example: 'Ivan',
    description: 'Correct name',
  })
  name: string;

  @IsString()
  @MaxLength(40)
  @ApiProperty({
    example: 'Pavlov',
    description: 'Correct surname',
  })
  surname: string;

  @IsString()
  @IsOptional()
  profileImage: string;

  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
    message: ValidationMessagesEnum.EMAIL,
  })
  @ApiProperty({
    example: 'mymaill@gmail.com',
    description: 'Correct email address',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Password123@',
    description: 'Correct password',
  })
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
  @ApiProperty({
    example: 'Password123@',
    description: 'Correct confirmPassword',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @ApiProperty({
    example: '"1526186s5"',
    description: 'Correct phoneNumber',
  })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  emergencyContact: string;
}
