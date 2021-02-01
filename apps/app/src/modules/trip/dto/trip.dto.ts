import { double } from "aws-sdk/clients/lightsail";

export class TripDto {
    readonly driverId: string;
    readonly type: string;
    readonly numberPeople: number;
    readonly price: double;
}