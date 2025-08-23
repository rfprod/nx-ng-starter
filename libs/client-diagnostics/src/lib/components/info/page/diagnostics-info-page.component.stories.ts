import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import type { Args, Meta, StoryFn } from '@storybook/angular';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

export default {
  title: 'AppDiagnosticsInfoPage',
  component: AppDiagnosticsInfoPage,
} as Meta;

const story: StoryFn<AppDiagnosticsInfoPage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserModule, MatIconModule, MatListModule],
    declarations: [AppDiagnosticsInfoPage],
  },
  props: {
    ...args,
  },
});

export const primary = {
  render: story,

  args: {
    ping: 'ping result',
  },

  parameters: {
    /**
     * Use legacy Angular renderer.
     * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
     */
    // angularLegacyRendering: true,
  },
};
