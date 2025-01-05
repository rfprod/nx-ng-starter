import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { httpApiAction, httpApiSelector, IHttpApiState } from '@app/client-store-http-api';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-diagnostics-info',
  templateUrl: './diagnostics-info.component.html',
  styleUrls: ['./diagnostics-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppDiagnosticsInfoComponent implements OnInit {
  /**
   * Ping result.
   */
  public readonly ping$ = this.store.select(httpApiSelector.ping);

  constructor(private readonly store: Store<IHttpApiState>) {}

  public ngOnInit(): void {
    this.store.dispatch(httpApiAction.ping());
  }
}
