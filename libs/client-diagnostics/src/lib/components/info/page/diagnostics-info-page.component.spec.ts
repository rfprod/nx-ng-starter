import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestBedConfig, newTestBedMetadata, spyOnFunctions, TClassMemberFunctionSpiesObject } from '@app/client-testing-unit';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

describe('AppDiagnosticsInfoPage', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsInfoPage],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsInfoPage },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsInfoPage>;
  let component: AppDiagnosticsInfoPage;
  let componentSpy: TClassMemberFunctionSpiesObject<AppDiagnosticsInfoPage>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsInfoPage);
        component = fixture.componentInstance;
        componentSpy = spyOnFunctions<AppDiagnosticsInfoPage>(component);
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(componentSpy).toBeDefined();
  });
});
