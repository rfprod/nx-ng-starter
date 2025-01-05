import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppHttpProgressStoreModule } from '@app/client-store-http-progress';
import { sidebarAction } from '@app/client-store-sidebar';
import { AppTestingComponent, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';

import { AppSidebarRootComponent } from './sidebar-root.component';

describe('AppSidebarRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppSidebarRootComponent],
    imports: [AppHttpProgressStoreModule.forRoot()],
    providers: [
      provideRouter([
        {
          path: 'info',
          component: AppTestingComponent,
        },
        {
          path: 'charts',
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

  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppSidebarRootComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch');
    sidebarCloseHandlerSpy = jest.spyOn(component, 'sidebarCloseHandler');
    router = TestBed.inject(Router);
    routerNavigateSpy = jest.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('sidebarCloseHandler should call store dispatch', () => {
    component.sidebarCloseHandler();
    expect(storeDispatchSpy).toHaveBeenCalledWith(sidebarAction.close({ payload: { navigate: true } }));
  });

  it('navigateToInfoPage should call store dispatch', () => {
    component.navigateToInfoPage();
    expect(sidebarCloseHandlerSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { primary: 'info' } }]);
  });

  it('navigateToChartExamples should call store dispatch', () => {
    component.navigateToChartExamples();
    expect(sidebarCloseHandlerSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { primary: 'charts' } }]);
  });
});
