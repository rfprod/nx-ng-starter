import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Args, Meta, StoryFn } from '@storybook/angular';

import { AppDiagnosticsHomePage } from './diagnostics-home-page.component';

export default {
  title: 'AppDiagnosticsHomePage',
  component: AppDiagnosticsHomePage,
} as Meta;

const story: StoryFn<AppDiagnosticsHomePage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, MatIconModule, MatListModule],
    declarations: [AppDiagnosticsHomePage],
  },
  props: {
    ...args,
  },
});

export const primary = {
  render: story,

  args: {
    users: 1,
    staticData: [{ name: 'Static test', value: 1 }],
    dynamicData: [{ name: 'Dynamic test', value: 1 }],
  },

  parameters: {
    /**
     * Use legacy Angular renderer.
     * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
     */
    // angularLegacyRendering: true,
  },
};
