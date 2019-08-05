import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { routing, appRoutingProviders } from "./app.routing";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, routing, HttpClientModule, FormsModule],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
