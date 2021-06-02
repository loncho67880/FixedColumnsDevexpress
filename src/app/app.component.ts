import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    
  }
}
