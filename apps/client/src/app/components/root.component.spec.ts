import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@nx-ng-starter/client-unit-testing';

import { AppRootComponent } from './root.component';

describe('AppRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppRootComponent],
    imports: [RouterTestingModule],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppRootComponent>;
  let component: AppRootComponent;
  let spy: {
    component: TClassMemberSpiesObject<AppRootComponent>;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppRootComponent);
          component = fixture.componentInstance;
          spy = {
            component: setupJestSpiesFor<AppRootComponent>(component),
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
