import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { AppRouterStoreModule } from '@app/client-store-router';
import { AppSidebarStoreModule } from '@app/client-store-sidebar';
import { documentFactory, routerButton, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Args, Story } from '@storybook/angular/types-6-0';
import { of } from 'rxjs';

import { AppNavbarComponent } from './navbar.component';

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

export default {
  title: 'AppNavbarComponent',
  component: AppNavbarComponent,
};

const story: Story<AppNavbarComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      FlexLayoutModule,
      RouterTestingModule,
      StoreModule.forRoot({ router: routerReducer }),
      EffectsModule.forRoot(),
      AppSidebarStoreModule.forRoot(),
      AppClientMaterialModule.forRoot(),
      StoreRouterConnectingModule.forRoot(),
      AppRouterStoreModule.forRoot(),
    ],
    providers: [
      {
        provide: Router,
        useValue: {
          events: of(true),
          navigate: () => new Promise<boolean>(resolve => resolve(true)),
        },
      },
      {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
      },
      { provide: WINDOW, useFactory: windowFactory },
      { provide: DOCUMENT, useFactory: documentFactory },
      { provide: APP_BASE_HREF, useValue: '/' },
      {
        provide: WEB_CLIENT_APP_ENV,
        useValue: testingEnvironment,
      },
    ],
    declarations: [AppNavbarComponent],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  logoSrc: 'assets/icons/icon-72x72.png',
  buttons: [
    routerButton('Home', 'home', () => false, [{ outlets: { primary: [''], sidebar: [] } }]),
    routerButton('API info', 'api', () => false, [{ outlets: { primary: ['info'], sidebar: [] } }]),
    routerButton('Chart examples', 'show_chart', () => false, [{ outlets: { primary: ['charts'], sidebar: [] } }]),
    routerButton('Chat', 'chatbot', () => false, [{ outlets: { primary: ['chatbot'], sidebar: [] } }]),
  ],
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  angularLegacyRendering: true,
};
