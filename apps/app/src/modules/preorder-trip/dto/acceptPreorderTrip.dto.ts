import { IsNotEmpty, IsString } from 'class-validator';

export class AcceptPreorderTripDto {
  @IsString()
  @IsNotEmpty()
  preorderTripId: string;
}
