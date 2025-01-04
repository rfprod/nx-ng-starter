import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { httpApiSelector, type IHttpApiState } from '@app/client-store-http-api';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import { first, lastValueFrom, of } from 'rxjs';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppDiagnosticsInfoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('state should return the whole ping state', async () => {
    const ping = await lastValueFrom(component.ping$.pipe(first()));
    const pingState = await lastValueFrom(store.select(httpApiSelector.ping).pipe(first()));
    expect(ping).toEqual(pingState);
  });

  it('should dispatch one event on init', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
