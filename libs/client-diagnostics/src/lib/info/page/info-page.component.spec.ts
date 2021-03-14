import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@nx-ng-starter/client-unit-testing';

import { AppInfoPage } from './info-page.component';

describe('AppInfoPage', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppInfoPage],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppInfoPage },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppInfoPage>;
  let component: AppInfoPage;
  let spy: {
    component: TClassMemberSpiesObject<AppInfoPage>;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppInfoPage);
          component = fixture.debugElement.componentInstance;
          spy = {
            component: setupJestSpiesFor<AppInfoPage>(component),
          };
          expect(spy.component).toBeDefined();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
