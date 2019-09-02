import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [UserService]
})
export class FeedComponent implements OnInit {
  public user: User;
  public url: string;

  constructor(private _userService: UserService, private _router: Router,
    private _route: ActivatedRoute) {
    this.url = environment.serviceUrl;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      const id = params.id;
      this.getUser(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        this.user = response;
      },
      error => {
        console.log(error as any);
      });
  }

}
