import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import type { Args, Meta, StoryFn } from '@storybook/angular';

import { AppTooltipDirective } from '../tooltip/tooltip.directive';
import { AppNavigatorComponent } from './navigator.component';

export default {
  title: 'AppNavigatorComponent',
  component: AppNavigatorComponent,
} as Meta;

const story: StoryFn<AppNavigatorComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    declarations: [AppNavigatorComponent, AppTooltipDirective],
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
