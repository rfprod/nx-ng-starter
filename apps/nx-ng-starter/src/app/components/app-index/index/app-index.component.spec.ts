import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TClassMemberSpiesObject,
  testingEnvironment,
} from '@nx-ng-starter/mocks-core';
import { AppSharedCoreModule } from '@nx-ng-starter/shared-core';
import { AppWebsocketModule } from '@nx-ng-starter/shared-store/state/websocket/websocket.module';

import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppIndexComponent],
    imports: [
      AppSharedCoreModule.forRoot(),
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

  beforeEach(async(() => {
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
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
