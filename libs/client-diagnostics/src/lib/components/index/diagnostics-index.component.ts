import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IWebsocketState, websocketActions } from '@app/client-store-websocket';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-diagnostics-index',
  templateUrl: './diagnostics-index.component.html',
  styleUrls: ['./diagnostics-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsIndexComponent {
  constructor(private readonly store: Store<IWebsocketState>) {
    this.store.dispatch(websocketActions.connect());
    this.store.dispatch(websocketActions.getEvents());
  }
}
