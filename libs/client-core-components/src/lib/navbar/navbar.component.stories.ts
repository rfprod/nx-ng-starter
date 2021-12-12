import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { AppChatbotState } from '@app/client-store-chatbot';
import { AppSidebarState } from '@app/client-store-sidebar';
import { AppUserState } from '@app/client-store-user';
import { documentFactory, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@app/client-util';
import { NgxsModule } from '@ngxs/store';
import { Args, Story } from '@storybook/angular/types-6-0';

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
      NgxsModule.forRoot([AppSidebarState, AppChatbotState, AppUserState]),
      AppClientMaterialModule.forRoot(),
    ],
    providers: [
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
    {
      routerLink: [{ outlets: { primary: [''], sidebar: [] } }],
      routeActive: () => false,
      icon: 'home',
      title: 'Home',
    },
    {
      routerLink: [{ outlets: { primary: ['info'], sidebar: [] } }],
      routeActive: () => false,
      icon: 'touch_app',
      title: 'API info',
    },
    {
      routerLink: [{ outlets: { primary: ['chatbot'], sidebar: [] } }],
      routeActive: () => false,
      icon: 'chat',
      title: 'Chat',
    },
  ],
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  angularLegacyRendering: true,
};
