import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis-brocker:6380',
      },
    });
  }

  @WebSocketServer() server: Server;
  private logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Websockets was initialized');
  }

  @SubscribeMessage('lastknownLocation')
  async handleLocation(client: Socket, data: any): Promise<any> {
    const response = await this.client
      .send('lastLocation', JSON.stringify(data))
      .toPromise();
    this.server.emit('lastknownLocation', response);
    return response;
  }

  @SubscribeMessage('searchArea')
  notifyDrivers(@MessageBody() data: any, @ConnectedSocket() client?: Socket) {
    this.server.emit('searchArea', data);
  }

  @SubscribeMessage('notifyUserOfDriverComing')
  notifyUserOfDriverComing(
    @MessageBody() data: any,
    @ConnectedSocket() client?: Socket,
  ) {
    this.server.emit('notifyUserOfDriverComing', data);
  }
}
