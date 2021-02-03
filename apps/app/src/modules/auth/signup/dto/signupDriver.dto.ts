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
  
  export class SignupDriverDto {
    @IsString({ message: ValidationMessagesEnum.NAME })
    @MaxLength(40, { message: ValidationMessagesEnum.NAME })
    @ApiProperty({
      example: 'Ivan',
      description: 'Correct name shorter than 40 characters',
    })
    name: string;
  
    @IsString()
    @MaxLength(40)
    @ApiProperty({
      example: 'Pavlov',
      description: 'Correct surname shorter than 40 characters',
    })
    surname: string;
  
    @ApiProperty({
      title: 'Attachment',
      description: 'Size < 5Mb and format [jpg, png, svg, tiff, webp]',
      type: 'file',
      required: false,
    })
    profileImage: string;
  
    @IsEmail()
    @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, {
      message: ValidationMessagesEnum.EMAIL,
    })
    @ApiProperty({
      example: 'mymail@gmail.com',
      description: 'Correct email address',
    })
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      example: 'Password123@',
      description:
        'Correct password which include at least one capital letter, one small and  one digit ',
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
      description:
        'Correct password which include at least one capital letter, one small and  one digit ',
    })
    confirmPassword: string;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @ApiProperty({
      example: '+380638901212',
      description: 'Correct phoneNumber, shorter than 15 characters',
    })
    //TODO custom validation
    phoneNumber: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(15)
    @ApiProperty({
      required: false,
      example: '"1526186s5"',
      description: 'Correct phoneNumber, shorter than 15 characters',
    })
    emergencyContact: string;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'true',
        description: 'Boolean type (true or false)'
    })
    isVerified: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: '["driver license", "passport"]',
        description: 'Array of documents, in string data type'
    })
    documents: string[];

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'provided',
        description: 'Provided / None'
    })
    documentsStatus: string;
  }
  