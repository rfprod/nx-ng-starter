import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMarkdownService } from '@nx-ng-starter/client-services';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@nx-ng-starter/client-unit-testing';

import { AppHomeComponent } from './home.component';

describe('AppHomeComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppHomeComponent],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppHomeComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppHomeComponent>;
  let component: AppHomeComponent;
  let service: AppMarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
    component: TClassMemberSpiesObject<AppHomeComponent>;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppHomeComponent);
          component = fixture.debugElement.componentInstance;
          service = TestBed.inject(AppMarkdownService);
          spy = {
            service: {
              process: jest
                .spyOn(service, 'process')
                .mockImplementation((input: string) => `marked ${input}`),
            },
            component: setupJestSpiesFor<AppHomeComponent>(component),
          };
          expect(spy.service.process).toBeDefined();
          expect(spy.component).toBeDefined();
          (component as any).timer$ = null;
          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
