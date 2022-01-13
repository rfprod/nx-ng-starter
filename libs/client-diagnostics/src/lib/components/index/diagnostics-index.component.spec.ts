import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppWebsocketStoreModule } from '@app/client-store-websocket';
import {
  getTestBedConfig,
  newTestBedMetadata,
  spyOnFunctions,
  TClassMemberFunctionSpiesObject,
  testingEnvironment,
} from '@app/client-unit-testing';

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

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppDiagnosticsIndexComponent);
          component = fixture.componentInstance;
          componentSpy = spyOnFunctions<AppDiagnosticsIndexComponent>(component);
          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(componentSpy).toBeDefined();
  });
});
