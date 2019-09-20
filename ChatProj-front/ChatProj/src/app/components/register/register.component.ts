import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment'

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


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
  public selectedFile: ImageSnippet;

  // tslint:disable-next-line: variable-name
  constructor(private _userService : UserService) {
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit() { }

  onSubmit(form) {
      this._userService.RegisterUser(this.user).subscribe(
        response => {
          if (response.user) {
            this.status = 'succes';
            //Subir la imagen
          } else {
            this.status = 'failed';
          }
        },
        error => {
          console.log(error as any);
        }
      );
    }

  passLength() {
      if (this.user.password.length >= 6) {
        return true;
      }
    }
    processFile(event) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
  
      reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, file);
  
        this._userService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
          console.log(res);
          },
          (err) => {
          console.log(err);
          })
      });
  
      reader.readAsDataURL(file);
    }
  }
