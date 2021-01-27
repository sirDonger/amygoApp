import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationMessagesEnum } from '../../messagesEnum';

export class SignInUserDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
    message: ValidationMessagesEnum.EMAIL,
  })
  @ApiProperty({
    example: 'mymail@gmail.com',
    description: 'Correct email address',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,60}$/, {
    message:
      ValidationMessagesEnum.PASSWORD + ValidationMessagesEnum.CONFIRM_PASSWORD,
  })
  @ApiProperty({
    example: 'Password123##',
    description:
      'Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly password: string;
}
