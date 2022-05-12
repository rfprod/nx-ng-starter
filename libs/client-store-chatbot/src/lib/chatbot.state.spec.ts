import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppTestingComponent } from '@app/client-unit-testing';
import { Navigate, NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

import { chatbotActions } from './chatbot.actions';
import { chatbotInitialState, IChatbotState } from './chatbot.interface';
import { AppChatbotState } from './chatbot.state';

describe('AppChatbotState', () => {
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
          outlet: 'chatbot',
          children: [
            {
              path: 'root',
              component: AppTestingComponent,
            },
          ],
        },
      ]),
      NgxsModule.forRoot([AppChatbotState], { developmentMode: true }),
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
        void store.dispatch(new chatbotActions.setState(chatbotInitialState));
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    void store
      .selectOnce(AppChatbotState.state)
      .pipe(
        tap(state => {
          expect(state).toEqual(chatbotInitialState);
        }),
      )
      .subscribe();
  }));

  it('toggleSidebar action should toggle the chatbot state and call the router navigate actions', waitForAsync(() => {
    const spy = jest.spyOn(store, 'dispatch');
    const routerSpy = jest.spyOn(router, 'navigate');
    routerSpy.mockImplementation(() => new Promise(resolve => resolve(false)));
    void store
      .dispatch(new chatbotActions.toggle())
      .pipe(
        switchMap(() => store.selectOnce(AppChatbotState.state)),
        tap(result => {
          const expectedState = <IChatbotState>{ chatbotOpened: true };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith(new Navigate([{ outlets: { chatbot: ['root'] } }]));
        }),
        switchMap(() => store.dispatch(new chatbotActions.toggle())),
        switchMap(() => store.selectOnce(AppChatbotState.state)),
        tap(result => {
          const expectedState = <IChatbotState>{ chatbotOpened: false };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith(new Navigate([{ outlets: { chatbot: null } }]));
        }),
      )
      .subscribe();
  }));
});
