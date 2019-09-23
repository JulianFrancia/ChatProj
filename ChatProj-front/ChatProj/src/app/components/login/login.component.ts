import { Component, OnInit } from '@angular/core';
import { UserLogged } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public userLogged: UserLogged;
  public stateLogin: boolean

  constructor(private _userService: UserService, private router: Router, private spinner: NgxSpinnerService) {
    this.stateLogin = false
  }

  ngOnInit() {}

  onSubmit(username: string, password: string) {
    this._userService.login(username, password).subscribe(
      res => {
        console.log(res);
        console.log('Logeado');
        let u: UserLogged = {name: username};        
        this._userService.setUserLoggedIn(u);
        this.stateLogin = true;        
      },
      error => {
        console.error(error);
      },
      () => this.navigate()
    );
  }
  navigate() {    
    this.router.navigateByUrl('/feed');
  }

}
