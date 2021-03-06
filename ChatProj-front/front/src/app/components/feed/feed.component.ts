// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../../app/services/chat.service';
import { AuthService } from '../../services/auth.service';
import { trigger, animate, state, style, transition } from '@angular/animations';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [UserService, ChatService, AuthService],
  animations: [
    trigger('animate', [
      state('open', style({
        opacity: 0
      })),
      state('close', style({
        opacity: 1
      })),
      transition('open => close', [animate('2s')])
    ])
  ]
})
export class FeedComponent implements OnInit {
  room: string;
  user: User;
  url: string;
  messageArray: Array<{ user: string, message: string }> = [];
  public animate = 'open';

  chatForm = new FormGroup({
    chatBox: new FormControl('', [Validators.required])
  });


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _chatService: ChatService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));

    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
    setTimeout(() => {
      this.animate = 'close';
    }, 400);
  }

  join() {
    this._chatService.joinRoom({ user: this.user.nick, room: this.room });
  }

  leave() {
    this._chatService.leaveRoom({ user: this.user.nick, room: this.room });
  }

  //  sendMessage() {
  //   this._chatService.sendMessage({ user: this.user.nick, room: this.room, text: this.message });
  //  }
  onSubmit(textMsg: string) {
    this.messageArray.push({ user: this.user.nick, message: textMsg });
    this._chatService.sendMessage({ user: this.user.nick, room: this.room, text: textMsg });
    this.chatForm.reset();
  }

  logOut() {
    localStorage.removeItem('token');
    this._userService.navigateTo('/login');
  }

}
