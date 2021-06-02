import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { HeaderEffects } from './store/header.effect';
import * as fromHeader from './store/header.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot(),
    StoreModule.forFeature(fromHeader.headerFeatureKey, fromHeader.reducer),
    EffectsModule.forFeature([HeaderEffects]),
    NgbModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
