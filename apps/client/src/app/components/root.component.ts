import { AfterContentInit, ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

interface ILogoRef {
  dark: 'assets/svg/logo.svg';
  light: 'assets/svg/logo-light.svg';
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRootComponent implements OnInit, AfterContentInit {
  /**
   * Defines if UI should use alternative dark material theme.
   * This must be a flag. HostBinding should not use async pipes.
   */
  @HostBinding('class.unicorn-dark-theme') public darkTheme = false;

  /**
   * Sets text size that is inherited by all child views.
   */
  @HostBinding('class.mat-body-1') public matBody = true;

  private readonly logoRef: ILogoRef = {
    dark: 'assets/svg/logo.svg',
    light: 'assets/svg/logo-light.svg',
  };

  private readonly logoSrcSubject = new BehaviorSubject<ILogoRef['dark'] | ILogoRef['light']>(this.logoRef.light);

  public readonly logoSrc$ = this.logoSrcSubject.asObservable();

  /**
   * Application release version.
   */
  public readonly version = this.env.meta.version;

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly sw: AppServiceWorkerService,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {}

  public toggleMaterialTheme(darkThemeEnabled: boolean): void {
    this.darkTheme = darkThemeEnabled;
    const nextLogo = darkThemeEnabled ? this.logoRef.light : this.logoRef.dark;
    this.logoSrcSubject.next(nextLogo);
  }

  /**
   * Lifecycle hook called on component initialization.
   * When called does the following:
   * - sets the document title;
   * - sets the document description;
   */
  public ngOnInit(): void {
    this.title.setTitle(this.env.appName);
    this.meta.updateTag({ description: this.env.description });
  }

  public ngAfterContentInit(): void {
    void this.sw.subscribeToUpdates$.pipe(untilDestroyed(this)).subscribe();
  }
}
