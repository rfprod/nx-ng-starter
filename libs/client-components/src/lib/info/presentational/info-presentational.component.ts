import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-presentational',
  templateUrl: './info-presentational.component.html',
  styleUrls: ['./info-presentational.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppInfoPresentationalComponent {
  @Input() public readonly ping = '';

  @Input() public readonly markedInstructions = '';
}
