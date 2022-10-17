import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppWebsocketStoreModule, websocketActions } from '@app/client-store-websocket';
import {
  getTestBedConfig,
  newTestBedMetadata,
  spyOnFunctions,
  TClassMemberFunctionSpiesObject,
  testingEnvironment,
} from '@app/client-testing-unit';
import { Store } from '@ngrx/store';

import { AppDiagnosticsIndexComponent } from './diagnostics-index.component';

describe('AppDiagnosticsIndexComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsIndexComponent],
    imports: [
      AppWebsocketStoreModule.forRoot(testingEnvironment),
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsIndexComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsIndexComponent>;
  let component: AppDiagnosticsIndexComponent;
  let componentSpy: TClassMemberFunctionSpiesObject<AppDiagnosticsIndexComponent>;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        fixture = TestBed.createComponent(AppDiagnosticsIndexComponent);
        component = fixture.componentInstance;
        componentSpy = spyOnFunctions<AppDiagnosticsIndexComponent>(component);
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(componentSpy).toBeDefined();
  });

  it('should call store dispatch on init', () => {
    expect(storeDispatchSpy).toHaveBeenCalledWith(websocketActions.connect());
    expect(storeDispatchSpy).toHaveBeenCalledWith(websocketActions.getEvents());
  });
});
