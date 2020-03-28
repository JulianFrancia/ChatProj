import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public stateLogin: boolean;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(private _userService: UserService, private router: Router, private translate: TranslateService) {
    this.stateLogin = false;
    this.translate.setDefaultLang('en')
  }

  ngOnInit() { }

  onSubmit(username: string, password: string) {
    this._userService.login(username, password).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.stateLogin = true;
      },
      error => {
        console.error(error);
      },
      () => this._userService.navigateTo('/feed')
    );
  }
}
