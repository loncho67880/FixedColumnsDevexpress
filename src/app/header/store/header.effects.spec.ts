import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HeaderEffects } from './header.effect';
import { HttpClientModule } from '@angular/common/http';

describe('Header effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: HeaderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(HeaderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
