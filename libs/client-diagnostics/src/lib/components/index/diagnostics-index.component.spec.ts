import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { diagnosticsAction } from '@app/client-store-diagnostics';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';

import { AppDiagnosticsIndexComponent } from './diagnostics-index.component';

describe('AppDiagnosticsIndexComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsIndexComponent],
    providers: [
      {
        provide: Store,
        useValue: {
          dispatch: () => void 0,
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppDiagnosticsIndexComponent>;
  let component: AppDiagnosticsIndexComponent;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(AppDiagnosticsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should call store dispatch on init', () => {
    const calls = {
      first: 1,
      second: 2,
      third: 3,
    };
    expect(storeDispatchSpy).toHaveBeenNthCalledWith(calls.first, diagnosticsAction.staticData());
    expect(storeDispatchSpy).toHaveBeenNthCalledWith(calls.second, diagnosticsAction.startEvents());
    expect(storeDispatchSpy).toHaveBeenNthCalledWith(calls.third, diagnosticsAction.stopEvents());
  });
});
