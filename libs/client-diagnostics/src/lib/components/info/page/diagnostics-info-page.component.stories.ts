import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Args, Meta, StoryFn } from '@storybook/angular';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

export default {
  title: 'AppDiagnosticsInfoPage',
  component: AppDiagnosticsInfoPage,
} as Meta;

const story: StoryFn<AppDiagnosticsInfoPage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, MatIconModule, MatListModule],
    declarations: [AppDiagnosticsInfoPage],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  ping: 'ping result',
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
