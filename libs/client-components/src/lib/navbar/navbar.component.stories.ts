import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { documentFactory, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@nx-ng-starter/client-util';
import { Args, Story } from '@storybook/angular/types-6-0';

import { AppNavbarComponent } from './navbar.component';

export default {
  title: 'AppNavbarComponent',
};

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

const story: Story<AppNavbarComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, FlexLayoutModule, AppClientMaterialModule.forRoot()],
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
  },
  component: AppNavbarComponent,
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  logoSrc: 'assets/icons/icon-72x72.png',
  anchors: [
    {
      href: 'https://cli.angular.io/reference.pdf',
      icon: 'build',
      title: 'CLI Reference',
    },
    {
      href: 'https://material.angular.io/',
      icon: 'change_history',
      title: 'Angular Material',
    },
    {
      href: 'https://material.io/icons/',
      icon: 'info_outline',
      title: 'Material Icons',
    },
  ],
};
