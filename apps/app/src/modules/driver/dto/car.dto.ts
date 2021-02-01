import { IsString, IsNotEmpty } from 'class-validator';

export class CarDto {
    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsNotEmpty()
    @IsString()
    readonly model: string;

    @IsNotEmpty()
    @IsString()
    readonly color: string;

    @IsNotEmpty()
    @IsString()
    readonly carNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly carType: string;

    @IsNotEmpty()
    @IsString()
    readonly driverId: string;

}