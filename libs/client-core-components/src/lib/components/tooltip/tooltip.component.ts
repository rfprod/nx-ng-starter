import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { ITooltipData, TOOLTIP_DATA } from './tooltip.interface';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class="app-tooltip">
      <small class="app-tooltip__text">{{ data.text }}</small>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTooltipComponent {
  constructor(@Inject(TOOLTIP_DATA) public readonly data: ITooltipData) {}
}
