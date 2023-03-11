import { ChangeDetectionStrategy, Component } from '@angular/core';
import { diagnosticsSelectors, IDiagnosticsState } from '@app/client-store-diagnostics';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-diagnostics-home',
  templateUrl: './diagnostics-home.component.html',
  styleUrls: ['./diagnostics-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsHomeComponent {
  public readonly staticData$ = this.store.select(diagnosticsSelectors.staticData);

  public readonly dynamicData$ = this.store.select(diagnosticsSelectors.dynamicData);

  public readonly users$ = this.store.select(diagnosticsSelectors.users);

  constructor(private readonly store: Store<IDiagnosticsState>) {}
}
