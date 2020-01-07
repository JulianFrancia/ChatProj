// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserLogged } from '../../models/user.model';
import { UserService } from '../../services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../../app/services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [UserService, ChatService, AuthService]
})
export class FeedComponent implements OnInit {
  room: string;
  user: User;
  userLogged: UserLogged; /* ??????? */
  url: string;
  messageArray: Array<{ user: string, message: string }> = [];
  message: Array<string> = [];

    chatForm = new FormGroup({
     chatBox: new FormControl('', [Validators.required])
  });


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

   onSubmit(textChat) {
     this.message.push(textChat);
     this.chatForm.reset();
   }
   
   logOut(){
     localStorage.removeItem('token');
     this._userService.navigateTo('/login')
   }

}
