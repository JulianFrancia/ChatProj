import { Component } from '@angular/core';
import { UserService } from './services/service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public activeLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLang);
  }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }

}
