import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import { Args, Meta, Story } from '@storybook/angular';

import { AppDiagnosticsHomePage } from './diagnostics-home-page.component';

export default {
  title: 'AppDiagnosticsHomePage',
  component: AppDiagnosticsHomePage,
} as Meta;

const story: Story<AppDiagnosticsHomePage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    declarations: [AppDiagnosticsHomePage],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  timer: '1',
  markedInstructions: 'Marked instructions',
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
