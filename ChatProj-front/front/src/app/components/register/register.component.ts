import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl,  Validators, FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
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
      username : new FormControl('', [Validators.minLength(6)]),
      password: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.minLength(6)]),
      firstName: '',
      lastName: '',
      email: new FormControl('', [Validators.pattern(this.emailPattern)]),
      nickName: new FormControl('', [Validators.minLength(4)]),
      image: '',
    }, {
      validator: this.passwordValidator
    });
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }

  onSubmit() {
      if (this.registerForm.valid) {
        this.user.username = this.registerForm.value.username;
        this.user.password = this.registerForm.value.password;
        this.user.firstName = this.registerForm.value.firstName;
        this.user.lastName = this.registerForm.value.lastName;
        this.user.email = this.registerForm.value.email;
        this.user.nick = this.registerForm.value.nickName;
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
