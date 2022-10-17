import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSidebarStoreModule, sidebarActions } from '@app/client-store-sidebar';
import { AppTestingComponent, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppContentComponent } from './content.component';

describe('AppContentComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      AppSidebarStoreModule.forRoot(),
      RouterTestingModule.withRoutes([
        {
          path: '',
          component: AppTestingComponent,
        },
      ]),
    ],
    declarations: [AppContentComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppContentComponent>;
  let component: AppContentComponent;
  let store: Store;
  let storeSpy: {
    dispatch: jest.SpyInstance;
  };
  let router: Router;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppContentComponent);
        component = fixture.debugElement.componentInstance;

        store = TestBed.inject(Store);
        storeSpy = {
          dispatch: jest.spyOn(store, 'dispatch').mockImplementation((action: unknown) => of(null)),
        };

        router = TestBed.inject(Router);

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('sidebarCloseHandler should call store dispatch', () => {
    component.sidebarCloseHandler();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(sidebarActions.close({ payload: { navigate: true } }));
  });

  it('sidebarOpenHandler should call store dispatch', waitForAsync(() => {
    component.sidebarOpenHandler();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(sidebarActions.open({ payload: { navigate: true } }));
  }));

  it('should scroll content on router events', async () => {
    expect(component.content).toBeDefined();
    if (typeof component.content !== 'undefined') {
      const scrollToSpy = jest.spyOn(component.content, 'scrollTo');
      await router.navigate(['']);
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });
    }
  });
});
