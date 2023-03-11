import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TDiagnosticData } from '@app/client-store-diagnostics';

@Component({
  selector: 'app-diagnostics-home-page',
  templateUrl: './diagnostics-home-page.component.html',
  styleUrls: ['./diagnostics-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsHomePage {
  @Input() public users: number | null = null;

  @Input() public staticData: TDiagnosticData[] | null = null;

  @Input() public dynamicData: TDiagnosticData[] | null = null;
}
