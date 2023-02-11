import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import { anchorButton } from '@app/client-util';
import { Args, Meta, Story } from '@storybook/angular';

import { AppToolbarComponent } from './toolbar.component';

export default {
  title: 'AppToolbarComponent',
  component: AppToolbarComponent,
} as Meta;

const story: Story<AppToolbarComponent> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    declarations: [AppToolbarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  version: '1.0.0',
  anchors: [
    anchorButton(
      'Report a bug',
      'bug_report',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=bug_report.md&title=',
    ),
    anchorButton(
      'Request a feature',
      'lightbulb',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=feature_request.md&title=',
    ),
    anchorButton(
      'Request maintenance',
      'engineering',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=maintenance.md&title=',
    ),
  ],
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
