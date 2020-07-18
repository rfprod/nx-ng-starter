import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

export function matTooltipOptionsFactory(): MatTooltipDefaultOptions {
  return {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
  };
}
