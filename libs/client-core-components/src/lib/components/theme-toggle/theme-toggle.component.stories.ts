import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from '@app/client-material';
import { AppThemeStoreModule } from '@app/client-store-theme';
import { documentFactory, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Args, Story } from '@storybook/angular/types-6-0';

import { AppThemeToggleComponent } from './theme-toggle.component';

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

export default {
  title: 'AppThemeToggleComponent',
  component: AppThemeToggleComponent,
};

const story: Story<AppThemeToggleComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      FlexLayoutModule,
      RouterTestingModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot(),
      AppThemeStoreModule.forRoot(),
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
    declarations: [AppThemeToggleComponent],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
