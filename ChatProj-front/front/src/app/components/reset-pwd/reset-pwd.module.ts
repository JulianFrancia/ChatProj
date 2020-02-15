import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPwdComponent } from './reset-pwd.component';
import { ResetPwdRoutingModule } from './reset-pwd-routing.module';

// ANGULAR MATERIAL
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ResetPwdComponent],
  imports: [
    CommonModule,
    ResetPwdRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ResetPwdModule { }
