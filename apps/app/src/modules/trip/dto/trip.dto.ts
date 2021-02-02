import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../../driver/entities/driver.entity';

export class TripDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Zelena, 108",
        description: "Place, where the user will be picked up"
    })
    readonly from: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Zelena, 108",
        description: "Place, which the user set as endpoint"
    })
    readonly where: string;

    @ApiProperty({
        required: false,
        description: 'Driver object. It should not be inserted in JSON'
    })
    driver: Driver;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: "2",
        description: "Amount of passengers"
    })
    readonly numberPeople: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: "23",
        description: "Price of the trip"
    })
    readonly price: number;
}