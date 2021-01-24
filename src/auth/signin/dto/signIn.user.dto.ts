import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  @ApiProperty({
    example: 'mymail@gmail.com',
    description: 'Correct email address',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: 'Password123##',
    description:
      'Password which consist of at least one Capital letter, one small, digit, and special symbol',
  })
  readonly password: string;
}
