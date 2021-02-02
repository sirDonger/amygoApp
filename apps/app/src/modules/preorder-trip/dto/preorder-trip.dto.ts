import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DateBetween } from '../../../helpers/validators/dateBetween';

export class PreorderTripDto {
  @IsOptional()
  @DateBetween()
  when: Date;

  @IsString()
  @IsNotEmpty()
  where: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  numberOfPeople: number;

  @IsOptional()
  userId: string;
}
