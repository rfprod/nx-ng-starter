import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TOOLTIP_DATA } from './tooltip.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppTooltipComponent {
  public readonly data = inject(TOOLTIP_DATA);
}
