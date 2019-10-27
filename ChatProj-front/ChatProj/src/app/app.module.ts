//SERVICIOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';


//MATERIAL
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';

//COMPONENTES
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
  //SERVICIOS ANGULAR  
  BrowserModule,
  AppRoutingModule,
  HttpClientModule, 
  FormsModule,
  ReactiveFormsModule,
  //ANGULAR MATERIAL
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatStepperModule,
  MaterialFileInputModule,
  MatIconModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
