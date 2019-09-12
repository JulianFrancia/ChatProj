import { Component, OnInit } from '@angular/core';
import { UserLogged } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public userLogged: UserLogged;
  public stateLogin: boolean

  constructor(private _userService: UserService, private router: Router, private spinner: NgxSpinnerService) {
    this.stateLogin = false
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    // ESTO ES PARA QUE LOS PLACEHOLDERS SUBAN AL BOX
    const $inputItem = $('.js-inputWrapper');
    // tslint:disable-next-line: no-unused-expression
    $inputItem.length &&
      $inputItem.each(function () {
        const $this = $(this);
        const $input = $this.find('.formRow--input');
        const placeholderTxt = $input.attr('placeholder');
        let $placeholder;
        $input.after('<span class="placeholder">' + placeholderTxt + '</span>'),
          $input.attr('placeholder', ''),
          ($placeholder = $this.find('.placeholder')),
          $input.val().length
            ? $this.addClass('active')
            : $this.removeClass('active'),
          $input
            .on('focusout', () => {
              $input.val().length
                ? $this.addClass('active')
                : $this.removeClass('active');
            })
            .on('focus', () => {
              $this.addClass('active');
            });
      });

  }

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
