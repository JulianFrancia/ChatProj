import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { User } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name: string;
  public password: string;
  public user: User;


  constructor(private spinner: NgxSpinnerService) {
    this.user = new User('', '', '', '');
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

  onSubmit() { }
}
