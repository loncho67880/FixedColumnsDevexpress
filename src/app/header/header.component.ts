import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from './store/header.actions';
import * as fromStore from './store/header.reducer';
import * as fromSelector from './store/header.selectors';
import { Header } from './models/header';
import { Options } from './models/options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  headerInfo$: Observable<Header>;
  options$: Observable<Options[]>;
  initials: string;

  constructor(private store: Store<fromStore.HeaderState>) {
    this.store.dispatch(fromActions.requestLoadHeaderInfo());
    this.store.dispatch(fromActions.requestLoadHeaderOptionsInfo());
    this.headerInfo$ = this.store.select(fromSelector.headerInfo);
    this.options$ = this.store.select(fromSelector.optionsInfo);
    this.headerInfo$.subscribe(data => {
      if (data) {
        this.initials = `PR`;
      }
    });
  }
}
