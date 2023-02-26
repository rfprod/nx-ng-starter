import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { diagnosticsActions, IDiagnosticsState } from '@app/client-store-diagnostics';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-diagnostics-index',
  templateUrl: './diagnostics-index.component.html',
  styleUrls: ['./diagnostics-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsIndexComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store<IDiagnosticsState>) {}

  public ngOnInit(): void {
    this.store.dispatch(diagnosticsActions.staticData());
    this.store.dispatch(diagnosticsActions.startEvents());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(diagnosticsActions.stopEvents());
  }
}
