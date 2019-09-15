import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [UserService]
})
export class MyProfileComponent implements OnInit {
  public user: User;
  public url: string;

  constructor(private _userService: UserService, private spinner: NgxSpinnerService, private _router: Router,
    private _route: ActivatedRoute) {
    this.url = environment.serviceUrl;
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
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
