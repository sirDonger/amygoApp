import {Module} from '@nestjs/common';
import {LocationController} from './location.controller';
import {LocationService} from './location.service';

@Module({
    imports: [],
    providers: [LocationService],
    controllers: [LocationController]
})

export class LocationModule{};
