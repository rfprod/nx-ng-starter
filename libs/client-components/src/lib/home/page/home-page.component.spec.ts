import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/client-unit-testing';

import { AppHomePage } from './home-page.component';

describe('AppHomePage', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppHomePage],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppHomePage },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppHomePage>;
  let component: AppHomePage;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppHomePage);
          component = fixture.debugElement.componentInstance;
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
