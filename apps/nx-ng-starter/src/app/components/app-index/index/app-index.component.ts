import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsocketService } from '@nx-ng-starter/shared-store/state/websocket/websocket.service';

/**
 * Application index component.
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexComponent {
  constructor(private readonly ws: WebsocketService) {
    this.ws.getData();
  }
}
