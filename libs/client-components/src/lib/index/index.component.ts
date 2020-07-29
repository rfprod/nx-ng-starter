import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppWebsocketService } from '@nx-ng-starter/client-store';

/**
 * Application index component.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexComponent {
  constructor(private readonly ws: AppWebsocketService) {
    this.ws.getData();
  }
}
