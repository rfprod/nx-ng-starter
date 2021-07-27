import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRootComponent implements OnInit {
  /**
   * Defines if UI should use alternative dark material theme.
   * This must be a flag. HostBinding should not use async pipes.
   */
  @HostBinding('class.unicorn-dark-theme') public darkTheme = false;

  /**
   * Sets text size that is inherited by all child views.
   */
  @HostBinding('class.mat-body-1') public matBody = true;

  constructor(private readonly title: Title, @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment) {}

  public toggleMaterialTheme(darkThemeEnabled: boolean): void {
    this.darkTheme = darkThemeEnabled;
  }

  public ngOnInit(): void {
    this.title.setTitle(this.env.appName);
  }
}
