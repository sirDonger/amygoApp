import {
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
    private client: ClientProxy;

    constructor(){
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: "redis://redis-brocker:6379",
                retryAttempts: 10,
                retryDelay: 3000,
            }
        })
    }

    @WebSocketServer() server: Server;
    private logger = new Logger('AppGateway');

    afterInit(server: Server){
        this.logger.log('Websockets was initialized');
    }

    @SubscribeMessage('lastknownLocation')
    handleLocation(client: Socket, data: object){
        var location = data;
        this.server.emit('lastknownLocation', location);
        return this.client.emit('lastLocation', JSON.stringify(data));
    }
}