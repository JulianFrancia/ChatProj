import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  // @WebSocketServer() wss: Server;
  // this.wss.emit('msgToClient', text); /* mensaje para todos */

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    client.on('join', (data) => {
      client.join(data.room);
      this.logger.log(`${data.user} joined the room: ${data.room}`);
      client.broadcast.to(data.room).emit('new user joined', { user: data.user, message: 'has joined the room.' });
    });
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client.id}`);

    client.on('leave', (data) => {
      client.leave(data.room);
      this.logger.log(`${data.user} left the room: ${data.room}`);
      client.broadcast.to(data.room).emit('left', { user: data.user, message: 'has left the room.' });
    });
  }

  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, text: string): WsResponse {
  //   // client.emit('msgToClient', text); /* otra forma de hacerlo pero perdés el tipado */
  //   return { event: 'msgToClient', data: text };
  // }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, data): WsResponse {
    /* con "broadcast.to" al que envía el mensaje no le llega */
    client.in(data.room).emit('new message', { user: data.user, message: data.text });
    return;
  }

}
