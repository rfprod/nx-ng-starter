import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { diagnosticsAction, IDiagnosticsState } from '@app/client-store-diagnostics';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-diagnostics-index',
  templateUrl: './diagnostics-index.component.html',
  styleUrls: ['./diagnostics-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppDiagnosticsIndexComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store<IDiagnosticsState>);

  public ngOnInit(): void {
    this.store.dispatch(diagnosticsAction.staticData());
    this.store.dispatch(diagnosticsAction.startEvents());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(diagnosticsAction.stopEvents());
  }
}
