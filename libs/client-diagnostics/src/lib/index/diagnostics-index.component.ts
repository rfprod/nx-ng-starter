import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { websocketActions } from '@nx-ng-starter/client-store';

@Component({
  selector: 'app-diagnostics-index',
  templateUrl: './diagnostics-index.component.html',
  styleUrls: ['./diagnostics-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsIndexComponent {
  constructor(private readonly store: Store) {
    void this.store.dispatch(new websocketActions.connect());
    void this.store.dispatch(new websocketActions.getEvents());
  }
}
