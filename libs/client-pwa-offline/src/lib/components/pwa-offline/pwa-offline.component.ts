import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * PWA offline component.
 * Displays a view that notifies the user of the offline network status.
 */
@Component({
  selector: 'app-pwa-offline',
  templateUrl: './pwa-offline.component.html',
  styleUrls: ['./pwa-offline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppPwaOfflineComponent {
  constructor(public readonly location: Location) {}

  /**
   * Loads a previous route that failed to load due to offline status.
   */
  public back(): void {
    this.location.back();
  }
}
