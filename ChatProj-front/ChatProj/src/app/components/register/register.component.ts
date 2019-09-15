import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public saveUser;
  public status: string;

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService, private spinner: NgxSpinnerService) {
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit() { }

  onSubmit(form) {
      this._userService.RegisterUser(this.user).subscribe(
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

  passLength() {
      if (this.user.password.length >= 6) {
        return true;
      }
    }  
  }
