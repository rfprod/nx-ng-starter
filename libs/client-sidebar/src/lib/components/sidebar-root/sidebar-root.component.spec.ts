import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHttpProgressState } from '@app/client-store-http-progress';
import { sidebarActions } from '@app/client-store-sidebar';
import { AppTestingComponent, getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { Navigate } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';

import { AppSidebarRootComponent } from './sidebar-root.component';

describe('AppSidebarRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppSidebarRootComponent],
    imports: [
      NgxsModule.forFeature([AppHttpProgressState]),
      RouterTestingModule.withRoutes([
        {
          path: 'info',
          component: AppTestingComponent,
        },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppSidebarRootComponent>;
  let component: AppSidebarRootComponent;

  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  let sidebarCloseHandlerSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppSidebarRootComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        sidebarCloseHandlerSpy = jest.spyOn(component, 'sidebarCloseHandler');
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('sidebarCloseHandler should call store dispatch', () => {
    component.sidebarCloseHandler();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new sidebarActions.closeSidebar());
  });

  it('navigateToInfoPage should call store dispatch', () => {
    component.navigateToInfoPage();
    expect(sidebarCloseHandlerSpy).toHaveBeenCalled();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new Navigate([{ outlets: { primary: 'info' } }]));
  });

  it('navigateToChartExamples should call store dispatch', () => {
    component.navigateToChartExamples();
    expect(sidebarCloseHandlerSpy).toHaveBeenCalled();
    expect(storeDispatchSpy).toHaveBeenCalledWith(new Navigate([{ outlets: { primary: 'charts' } }]));
  });
});
