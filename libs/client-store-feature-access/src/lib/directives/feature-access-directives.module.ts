import { NgModule } from '@angular/core';

import { AppFeatureFlagDirective } from './feature-flag/feature-flag.directive';

@NgModule({
  declarations: [AppFeatureFlagDirective],
  exports: [AppFeatureFlagDirective],
})
export class AppFeatureAccessDirectivesModule {}
