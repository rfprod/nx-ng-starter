import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppWebsocketModule } from '@nx-ng-starter/client-store';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
  testingEnvironment,
} from '@nx-ng-starter/client-unit-testing';

import { AppIndexComponent } from './index.component';

describe('AppIndexComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexComponent],
    imports: [
      AppWebsocketModule.forRoot(testingEnvironment),
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppIndexComponent>;
  let component: AppIndexComponent;
  let spy: {
    component: TClassMemberSpiesObject<AppIndexComponent>;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppIndexComponent);
          component = fixture.debugElement.componentInstance;
          spy = {
            component: setupJestSpiesFor<AppIndexComponent>(component),
          };
          expect(spy.component).toBeDefined();
          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
