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

import { AppToolbarComponent } from './toolbar.component';

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

export default {
  title: 'AppToolbarComponent',
  component: AppToolbarComponent,
};

const story: Story<AppToolbarComponent> = (args: Args) => ({
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
    declarations: [AppToolbarComponent],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  anchors: [
    {
      href: 'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=bug_report.md&title=',
      icon: 'bug_report',
      title: 'Report a bug',
    },
    {
      href: 'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=feature_request.md&title=',
      icon: 'lightbulb',
      title: 'Request a feature',
    },
    {
      href: 'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=maintenance.md&title=',
      icon: 'engineering',
      title: 'Request maintenance',
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
