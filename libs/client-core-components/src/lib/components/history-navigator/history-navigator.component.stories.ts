import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import { Args, Meta, StoryFn } from '@storybook/angular';

import { AppTooltipDirective } from '../tooltip/tooltip.directive';
import { AppHistoryNavigatorComponent } from './history-navigator.component';

export default {
  title: 'AppHistoryNavigatorComponent',
  component: AppHistoryNavigatorComponent,
} as Meta;

const story: StoryFn<AppHistoryNavigatorComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    declarations: [AppHistoryNavigatorComponent, AppTooltipDirective],
  },
  props: {
    ...args,
  },
});

export const primary = {
  render: story,

  args: {},

  parameters: {
    /**
     * Use legacy Angular renderer.
     * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
     */
    // angularLegacyRendering: true,
  },
};
