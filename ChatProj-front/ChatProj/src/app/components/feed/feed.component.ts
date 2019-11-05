// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserLogged } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../../app/services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [UserService, ChatService]
})
export class FeedComponent implements OnInit {
  room: string;
  user: User;
  userLogged: UserLogged; /* ??????? */
  url: string;
  messageArray: Array<{ user: string, message: string }> = [];

  // chatForm = new FormGroup({
  //   chatBox: new FormControl('', [Validators.required])
  // });

  // public messages = [];


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _chatService: ChatService,
  ) {
    // this.user = this._userService.();
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
  }

  join() {
    this._chatService.joinRoom({ user: 'unUsuario', room: this.room }); // this.user.nick
  }

  // onSubmit(textChat) {
  //   this.messages.push(textChat);
  //   this.chatForm.reset();
  // }

}
