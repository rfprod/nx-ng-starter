import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { httpApiSelectors, IHttpApiState } from '@app/client-store-http-api';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import { combineLatest, first, of, tap } from 'rxjs';

import { AppDiagnosticsInfoComponent } from './diagnostics-info.component';

describe('AppDiagnosticsInfoComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsInfoComponent],
    providers: [
      {
        provide: Store,
        useValue: {
          dispatch: () => void 0,
          select: () => of(''),
        },
      },
    ],
    imports: [MatIconModule, MatListModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppDiagnosticsInfoComponent>;
  let component: AppDiagnosticsInfoComponent;
  let store: Store<IHttpApiState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsInfoComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('state should return the whole ping state', waitForAsync(() => {
    void combineLatest([component.ping$.pipe(first()), store.select(httpApiSelectors.ping).pipe(first())])
      .pipe(
        tap(([ping, pingState]) => {
          expect(ping).toEqual(pingState);
        }),
      )
      .subscribe();
  }));

  it('should dispatch one event on init', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
