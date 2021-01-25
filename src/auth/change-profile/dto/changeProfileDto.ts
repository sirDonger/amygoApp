import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class ChangeProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(40)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  surname: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
  readonly email: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  profileImage: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  phoneNumber: string;

  //TODO which field should be changeable
  @IsString()
  @IsOptional()
  @MaxLength(15)
  emergencyContact: string;
}
