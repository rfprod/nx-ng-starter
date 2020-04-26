import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TComponentSpiesObject,
} from '@nx-ng-starter/mocks-core';

import { AppIndexApiComponent } from './app-index-api.component';

describe('AppIndexApiComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexApiComponent],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexApiComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppIndexApiComponent>;
  let component: AppIndexApiComponent;
  let spy: {
    component: TComponentSpiesObject<AppIndexApiComponent>;
  };

  let httpController: HttpTestingController;

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(AppIndexApiComponent);
        component = fixture.debugElement.componentInstance;
        spy = {
          component: setupJestSpiesFor<AppIndexApiComponent>(component),
        };
        expect(spy.component).toBeDefined();
        httpController
          .match(_ => true)
          .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
        fixture.detectChanges();
      });
  }));

  afterEach(() => {
    httpController
      .match(_ => true)
      .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
    httpController.verify();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
