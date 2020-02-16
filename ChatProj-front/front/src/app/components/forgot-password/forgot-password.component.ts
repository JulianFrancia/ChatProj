import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../../services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private _userService: UserService, public dialogo: MatDialog) { }

  ngOnInit() {
  }

  mostrarDialogo(text): void {
    this.dialogo
      .open(DialogComponent, {
        data: text
      })
      .afterClosed();
  }

  onSubmit() {
    let user = this.emailFormControl.value
    this._userService.forgotPwd(user).subscribe(res => {
      console.log(res)
    }, err => {
      this.mostrarDialogo(err.error.text);
    })
  }
}
