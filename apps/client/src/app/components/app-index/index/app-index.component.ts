import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppWebsocketService } from '@nx-ng-starter/client-store';

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
  constructor(private readonly ws: AppWebsocketService) {
    this.ws.getData();
  }
}
