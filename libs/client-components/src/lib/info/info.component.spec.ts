import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientTranslateModule } from '@nx-ng-starter/client-translate';
import {
  flushHttpRequests,
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@nx-ng-starter/client-unit-testing';

import { AppInfoComponent } from './info.component';

describe('AppInfoComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppInfoComponent],
    imports: [
      AppClientTranslateModule.forRoot(),
      RouterTestingModule.withRoutes([
        { path: '', component: AppInfoComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppInfoComponent>;
  let component: AppInfoComponent;
  let spy: {
    component: TClassMemberSpiesObject<AppInfoComponent>;
  };

  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          httpController = TestBed.inject(HttpTestingController);
          fixture = TestBed.createComponent(AppInfoComponent);
          component = fixture.debugElement.componentInstance;
          spy = {
            component: setupJestSpiesFor<AppInfoComponent>(component),
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
