import { ChangeDetectionStrategy, Component } from '@angular/core';
import { diagnosticsSelector, IDiagnosticsState } from '@app/client-store-diagnostics';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-diagnostics-home',
  templateUrl: './diagnostics-home.component.html',
  styleUrls: ['./diagnostics-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppDiagnosticsHomeComponent {
  public readonly staticData$ = this.store.select(diagnosticsSelector.staticData);

  public readonly dynamicData$ = this.store.select(diagnosticsSelector.dynamicData);

  public readonly users$ = this.store.select(diagnosticsSelector.users);

  constructor(private readonly store: Store<IDiagnosticsState>) {}
}
