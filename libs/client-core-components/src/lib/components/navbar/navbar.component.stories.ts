import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppMaterialModule } from '@app/client-material';
import { routerButton } from '@app/client-util';
import { Args, Meta, StoryFn } from '@storybook/angular';
import { of } from 'rxjs';

import { AppHistoryNavigatorComponent } from '../history-navigator/history-navigator.component';
import { AppTooltipDirective } from '../tooltip/tooltip.directive';
import { AppNavbarComponent } from './navbar.component';

export default {
  title: 'AppNavbarComponent',
  component: AppNavbarComponent,
} as Meta;

const story: StoryFn<AppNavbarComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    providers: [
      {
        provide: Router,
        useValue: {
          events: of(true),
          isActive: () => false,
        },
      },
    ],
    declarations: [AppNavbarComponent, AppHistoryNavigatorComponent, AppTooltipDirective],
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
  // angularLegacyRendering: true,
};
