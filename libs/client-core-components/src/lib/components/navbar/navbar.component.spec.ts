import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSidebarState, sidebarActions } from '@app/client-store-sidebar';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

import { AppNavbarComponent } from './navbar.component';

describe('AppNavbarComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [RouterTestingModule, NgxsModule.forFeature([AppSidebarState])],
    declarations: [AppNavbarComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppNavbarComponent>;
  let component: AppNavbarComponent;
  let env: IWebClientAppEnvironment;
  let store: Store;
  let storeSpy: {
    dispatch: jest.SpyInstance;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppNavbarComponent);
          component = fixture.debugElement.componentInstance;

          store = TestBed.inject(Store);
          storeSpy = {
            dispatch: jest.spyOn(store, 'dispatch').mockImplementation((action: unknown) => of(null)),
          };

          env = TestBed.inject(WEB_CLIENT_APP_ENV);

          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('appName should be equal to the app name in the environment object', () => {
    expect(component.appName).toEqual(env.appName);
  });

  it('sidebarCloseHandler should call store dispatch', () => {
    component.sidebarCloseHandler();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new sidebarActions.setState({ sidebarOpened: false }));
  });
});
