import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import { Args, Meta, StoryFn } from '@storybook/angular';

import { AppThemeToggleComponent } from './theme-toggle.component';

export default {
  title: 'AppThemeToggleComponent',
  component: AppThemeToggleComponent,
} as Meta;

const story: StoryFn<AppThemeToggleComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
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
