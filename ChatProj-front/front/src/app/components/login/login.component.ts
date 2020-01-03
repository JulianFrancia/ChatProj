import { Component, OnInit } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public stateLogin: boolean;
  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(private _userService: UserService, private router: Router) {
    this.stateLogin = false;
  }

  ngOnInit() {}

  onSubmit(username: string, password: string) {
    this._userService.login(username, password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.stateLogin = true;
      },
      error => {
        console.error(error);
      },
      () => this._userService.navigateTo('/feed')
    );
  }
};