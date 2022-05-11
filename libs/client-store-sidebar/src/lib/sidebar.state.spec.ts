import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppTestingComponent } from '@app/client-unit-testing';
import { Navigate, NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

import { sidebarActions } from './sidebar.actions';
import { ISiedbarState, sidebarInitialState } from './sidebar.interface';
import { AppSidebarState } from './sidebar.state';

describe('AppSidebarState', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [
      MatSidenavModule,
      RouterTestingModule.withRoutes([
        {
          path: '',
          component: AppTestingComponent,
        },
        {
          path: '',
          outlet: 'sidebar',
          children: [
            {
              path: 'root',
              component: AppTestingComponent,
            },
          ],
        },
      ]),
      NgxsModule.forRoot([AppSidebarState], { developmentMode: true }),
      NgxsRouterPluginModule.forRoot(),
    ],
  };

  let store: Store;
  let router: Router;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        void store.dispatch(new sidebarActions.setState(sidebarInitialState));
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    void store
      .selectOnce(AppSidebarState.state)
      .pipe(
        tap(state => {
          expect(state).toEqual(sidebarInitialState);
        }),
      )
      .subscribe();
  }));

  it('openSidebar should modify the state as expected and call the router navigate action', waitForAsync(() => {
    const spy = jest.spyOn(store, 'dispatch');
    const routerSpy = jest.spyOn(router, 'navigate');
    routerSpy.mockImplementation(() => new Promise(resolve => resolve(false)));
    void store
      .dispatch(new sidebarActions.openSidebar())
      .pipe(
        switchMap(() => store.selectOnce(AppSidebarState.state)),
        tap(result => {
          const expectedState = <ISiedbarState>{ sidebarOpened: true };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith(new Navigate([{ outlets: { sidebar: ['root'] } }]));
        }),
      )
      .subscribe();
  }));

  it('closeSidebar should modify the state as expected and call the router navigate action', waitForAsync(() => {
    const spy = jest.spyOn(store, 'dispatch');
    const routerSpy = jest.spyOn(router, 'navigate');
    routerSpy.mockImplementation(() => new Promise(resolve => resolve(false)));
    void store
      .dispatch(new sidebarActions.closeSidebar())
      .pipe(
        switchMap(() => store.selectOnce(AppSidebarState.state)),
        tap(result => {
          const expectedState = <ISiedbarState>{ sidebarOpened: false };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith(new Navigate([{ outlets: { sidebar: [] } }]));
        }),
      )
      .subscribe();
  }));

  it('toggleSidebar action should toggle the sidebar state and call the router navigate actions', waitForAsync(() => {
    const spy = jest.spyOn(store, 'dispatch');
    const routerSpy = jest.spyOn(router, 'navigate');
    routerSpy.mockImplementation(() => new Promise(resolve => resolve(false)));
    void store
      .dispatch(new sidebarActions.toggleSidebar())
      .pipe(
        switchMap(() => store.selectOnce(AppSidebarState.state)),
        tap(result => {
          const expectedState = <ISiedbarState>{ sidebarOpened: true };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith(new Navigate([{ outlets: { sidebar: ['root'] } }]));
        }),
        switchMap(() => store.dispatch(new sidebarActions.toggleSidebar())),
        switchMap(() => store.selectOnce(AppSidebarState.state)),
        tap(result => {
          const expectedState = <ISiedbarState>{ sidebarOpened: false };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith(new Navigate([{ outlets: { sidebar: [] } }]));
        }),
      )
      .subscribe();
  }));
});
