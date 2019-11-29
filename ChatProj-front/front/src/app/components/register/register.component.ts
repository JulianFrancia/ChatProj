import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import {ErrorStateMatcher} from '@angular/material';
import { FormControl,  Validators,FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/service.service';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('passwordsDoNotMatch'));
    return (invalidParent);
  }
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  public user: User;
  public saveUser;
  public status: string;
  public selectedFile: ImageSnippet;
  public passConfirm;
  public prueba: any;
  public emailPattern: any = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService, private fb: FormBuilder) {
    this.user = new User('', '', '', '', '', '', '');
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username : '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      email: new FormControl('', [Validators.pattern(this.emailPattern)]),
      nickName: '',
      image: '',
    }, {
      validator: this.passwordValidator
    });
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }

  onSubmit(user, password, nickName, firstName, lastName, email) {
      if (this.registerForm.valid) {
        this.user.username = user;
        this.user.password = password;
        this.user.nick = nickName;
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.email = email;
        this._userService.RegisterUser(this.user).subscribe(res => {
          console.log(res);
        },
        error => {
          console.log(error);
        });
      } else {
          console.log('failed');
      }
    }

    processFile(event) {
      const file: File = event.target.files[0];
      const reader = new FileReader();

      // tslint:disable-next-line: no-shadowed-variable
      reader.addEventListener('load', (event: any) => {

        this.selectedFile = new ImageSnippet(event.target.result, file);

        this._userService.uploadImage(this.selectedFile.file, this.user.username).subscribe(
          (res) => {
          console.log(res);
          },
          (err) => {
          console.log(err);
          });
      });

      reader.readAsDataURL(file);
    }
  }
