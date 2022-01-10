import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-diagnostics-info-page',
  templateUrl: './diagnostics-info-page.component.html',
  styleUrls: ['./diagnostics-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsInfoPage {
  @Input() public ping = '';

  @Input() public markedInstructions = '';
}
