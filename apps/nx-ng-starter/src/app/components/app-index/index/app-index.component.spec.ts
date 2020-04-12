import { ComponentFixture, TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  IObjectWithProperties,
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
} from '@nx-ng-starter/mocks-core';
import { SharedCoreModule } from '@nx-ng-starter/shared-core';
import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexComponent],
    imports: [
      SharedCoreModule.forRoot(),
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppIndexComponent>;
  let component: AppIndexComponent | any;
  let spy: {
    component: IObjectWithProperties<jest.SpyInstance>;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppIndexComponent);
        component = fixture.debugElement.componentInstance;
        spy = {
          component: setupJestSpiesFor<jest.SpyInstance>(component),
        };
        expect(spy.component).toBeDefined();
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
