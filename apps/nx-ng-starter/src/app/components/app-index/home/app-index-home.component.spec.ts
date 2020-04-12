import { ComponentFixture, TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TComponentSpiesObject,
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
} from '@nx-ng-starter/mocks-core';
import { SharedCoreModule } from '@nx-ng-starter/shared-core';
import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';
import { AppIndexHomeComponent } from './app-index-home.component';

describe('AppIndexHomeComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexHomeComponent],
    imports: [
      SharedCoreModule.forRoot(),
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexHomeComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppIndexHomeComponent>;
  let component: AppIndexHomeComponent | any;
  let service: MarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
    component: TComponentSpiesObject<AppIndexHomeComponent>;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppIndexHomeComponent);
        component = fixture.debugElement.componentInstance;
        component.timer$ = null;
        service = TestBed.inject(MarkdownService);
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
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
