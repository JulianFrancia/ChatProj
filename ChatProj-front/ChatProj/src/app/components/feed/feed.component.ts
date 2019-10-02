import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserLogged } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

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

  constructor(private _userService: UserService, private _router: Router,
    private _route: ActivatedRoute) {
    this.url = environment.serviceUrl;
  }

  ngOnInit() {
  }



}
