import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientTranslateModule } from '@app/client-translate';
import {
  flushHttpRequests,
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@app/client-unit-testing';

import { AppDiagnosticsInfoComponent } from './diagnostics-info.component';

describe('AppDiagnosticsInfoComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsInfoComponent],
    imports: [
      AppClientTranslateModule.forRoot(),
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsInfoComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsInfoComponent>;
  let component: AppDiagnosticsInfoComponent;
  let spy: {
    component: TClassMemberSpiesObject<AppDiagnosticsInfoComponent>;
  };

  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          httpController = TestBed.inject(HttpTestingController);
          fixture = TestBed.createComponent(AppDiagnosticsInfoComponent);
          component = fixture.debugElement.componentInstance;
          spy = {
            component: setupJestSpiesFor<AppDiagnosticsInfoComponent>(component),
          };
          expect(spy.component).toBeDefined();
          flushHttpRequests(httpController);
        });
    }),
  );

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
