import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/service.service'
import {FormControl, Validators} from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {
  public resetToken: '';
  public loading: boolean = true;

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  public mainToken= '';

  constructor(private _service: UserService, private route: ActivatedRoute) { 
    this.getToken();
  }

  ngOnInit() {
    
  }
  

  getToken() {
    let token;
    this.route.queryParamMap.subscribe(res => {token = res.get('token')});
    this._service.resetPwdValidation(token).subscribe(res => {
      console.log(res)
    }, 
    err => {
      if(err.status === 401){
        this._service.navigateTo('/login');
      } else {
        this.mainToken = err.error.text;
        this.loading = false;
      }
    })
  }  

  onSubmit() {
    let password = this.passFormControl.value;
    this._service.resetPwd(this.mainToken,password).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

}