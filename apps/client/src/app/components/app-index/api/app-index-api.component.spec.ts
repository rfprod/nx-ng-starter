import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientTranslateModule } from '@nx-ng-starter/client-translate';
import {
  flushHttpRequests,
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
} from '@nx-ng-starter/mocks-core';

import { AppIndexApiComponent } from './app-index-api.component';

describe('AppIndexApiComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexApiComponent],
    imports: [
      AppClientTranslateModule.forRoot(),
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
    component: TClassMemberSpiesObject<AppIndexApiComponent>;
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
        flushHttpRequests(httpController);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
