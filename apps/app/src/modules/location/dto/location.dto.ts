import { MaxLength, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  readonly where: string;
}
