import { IsOptional, IsString, MaxLength } from 'class-validator';

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
  @MaxLength(255)
  profileImage: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  emergencyContact: string;
}
