import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public name: string;
  public password: string;
  public nick: string;
  // private imageURL: string;
  public user: User;
  public createUser;
  public status: string;

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService) {
    this.user = new User('', '', '');
  }

  ngOnInit() {
    // EFECTO PARA QUE EL PLACEHOLDER SUBA
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
    $('body').bind('cut copy paste', (event) => {
      event.preventDefault();
    })
  }

  onSubmit(form) {
    if ($('#confirmpass').val() !== $('#password').val()) {
      $('#not_coincidence').html('*Las contraseñas no coinciden, intentelo de nuevo');
    } else {
      $('#not_coincidence').remove();
      this._userService.createUser(this.user).subscribe(
        response => {
          if (response.user) {
            this.status = 'succes';
          } else {
            this.status = 'failed';
          }
        },
        error => {
          console.log(error as any);
        }
      );
      form.reset();
    }
  }

  passLength() {
    if (this.user.password.length >= 6) {
      return true
    }
  }

}
