import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'dark',
  brandTitle: 'Nx ng starter',
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});
