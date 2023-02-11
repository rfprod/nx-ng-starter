import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import { Args, Meta, Story } from '@storybook/angular';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

export default {
  title: 'AppDiagnosticsInfoPage',
  component: AppDiagnosticsInfoPage,
} as Meta;

const story: Story<AppDiagnosticsInfoPage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    declarations: [AppDiagnosticsInfoPage],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  ping: 'ping result',
  markedInstructions: 'Marked instructions',
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
