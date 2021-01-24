import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  @ApiProperty({
    example: 'mymail@gmail.com',
    type: String,
    description: 'Correct email address',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  @ApiProperty({
    example: 'Password123##',
    type: String,
    description:
      'Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  @ApiProperty({
    example: 'Password123##',
    type: String,
    description:
      'New Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly newPassword: string;
}
