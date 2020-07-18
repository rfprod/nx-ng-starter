import { Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { RU, RU_DICTIONARY } from '../dictionaries/ru';

/**
 * Module providers.
 */
export const appSharedUiTranslateModuleProviders: Provider[] = [
  TranslateService,
  { provide: RU_DICTIONARY, useValue: RU },
];
