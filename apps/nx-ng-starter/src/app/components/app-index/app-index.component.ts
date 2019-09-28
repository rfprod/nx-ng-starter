import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Application index component.
 */
@Component({
  selector: 'nx-ng-starter-app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexComponent {}
