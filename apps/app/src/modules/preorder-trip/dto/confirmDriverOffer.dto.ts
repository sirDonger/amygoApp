import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class ConfirmDriverOfferDto {
    @IsString()
    @IsNotEmpty()
    driverId: string;

    @IsString()
    @IsNotEmpty()
    preorderTripId: string;

    @IsString()
    @IsOptional()
    userId: string;
}