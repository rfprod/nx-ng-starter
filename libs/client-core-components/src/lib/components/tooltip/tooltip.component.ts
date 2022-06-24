import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { ITooltipData, TOOLTIP_DATA } from './tooltip.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTooltipComponent {
  constructor(@Inject(TOOLTIP_DATA) public readonly data: ITooltipData) {}
}
