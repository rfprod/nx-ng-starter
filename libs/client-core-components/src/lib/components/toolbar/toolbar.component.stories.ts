import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from '@app/client-material';
import { AppChatbotStoreModule } from '@app/client-store-chatbot';
import { AppSidebarStoreModule } from '@app/client-store-sidebar';
import { AppUserStoreModule } from '@app/client-store-user';
import { anchorButton, documentFactory, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
      RouterTestingModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot(),
      AppSidebarStoreModule.forRoot(),
      AppChatbotStoreModule.forRoot(),
      AppUserStoreModule.forRoot(),
      AppMaterialModule.forRoot(),
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  version: '1.0.0',
  anchors: [
    anchorButton(
      'Report a bug',
      'bug_report',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=bug_report.md&title=',
    ),
    anchorButton(
      'Request a feature',
      'lightbulb',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=feature_request.md&title=',
    ),
    anchorButton(
      'Request maintenance',
      'engineering',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=maintenance.md&title=',
    ),
  ],
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
