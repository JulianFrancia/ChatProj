import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserLogged } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [UserService]
})
export class FeedComponent implements OnInit {
  public user: User;
  public userLogged: UserLogged;
  public url: string;

  chatForm = new FormGroup({
    chatBox : new FormControl('', [Validators.required])
  })
  public messages = [];


  constructor(private _userService: UserService, private _router: Router,
    private _route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onSubmit(textChat){
    this.messages.push(textChat)
    this.chatForm.reset()
  }

}
