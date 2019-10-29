import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl: string;
  private socket: any;

  constructor() {
    this.baseUrl = environment.serviceUrl;
    this.socket = io(this.baseUrl);
  }

  public joinRoom(data) {
    this.socket.emit('join', data);
  }
}
