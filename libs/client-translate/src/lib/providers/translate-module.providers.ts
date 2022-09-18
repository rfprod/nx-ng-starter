import { Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EN, EN_DICTIONARY } from '../dictionaries/en';
import { RU, RU_DICTIONARY } from '../dictionaries/ru';

/**
 * Module providers.
 */
export const appTranslateModuleProviders: Provider[] = [
  TranslateService,
  { provide: RU_DICTIONARY, useValue: RU },
  { provide: EN_DICTIONARY, useValue: EN },
];
