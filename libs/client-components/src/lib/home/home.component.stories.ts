import { AppClientMaterialModule } from '@nx-ng-starter/client-material';

import { AppHomeComponent } from './home.component';

export default {
  title: 'AppHomeComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [AppClientMaterialModule],
  },
  component: AppHomeComponent,
  props: {},
});
