import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMarkdownService } from '@nx-ng-starter/client-services';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@nx-ng-starter/mocks-core';

import { AppIndexHomeComponent } from './app-index-home.component';

describe('AppIndexHomeComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexHomeComponent],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexHomeComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppIndexHomeComponent>;
  let component: AppIndexHomeComponent;
  let service: AppMarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
    component: TClassMemberSpiesObject<AppIndexHomeComponent>;
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppIndexHomeComponent);
        component = fixture.debugElement.componentInstance;
        service = TestBed.inject(AppMarkdownService);
        spy = {
          service: {
            process: jest
              .spyOn(service, 'process')
              .mockImplementation((input: string) => `marked ${input}`),
          },
          component: setupJestSpiesFor<AppIndexHomeComponent>(component),
        };
        expect(spy.service.process).toBeDefined();
        expect(spy.component).toBeDefined();
        (component as any).timer$ = null;
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
