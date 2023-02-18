import { AfterContentInit, ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { chatbotActions, chatbotSelectors, IChatbotState } from '@app/client-store-chatbot';
import { routerActions } from '@app/client-store-router';
import { ISidebarState, sidebarActions, sidebarSelectors } from '@app/client-store-sidebar';
import { IThemeState, themeActions, themeSelectors } from '@app/client-store-theme';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

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

  public readonly appName = this.env.appName;

  private readonly logoRef: ILogoRef = {
    dark: 'assets/svg/logo.svg',
    light: 'assets/svg/logo-light.svg',
  };

  /**
   * Application release version.
   */
  public readonly version = this.env.meta.version;

  public readonly sidebarOpen$ = this.store.select(sidebarSelectors.sidebarOpen);

  public readonly chatbotOpen$ = this.store.select(chatbotSelectors.chatbotOpen);

  public readonly darkThemeEnabled$ = this.store.select(themeSelectors.darkThemeEnabled);

  public readonly logoSrc$ = this.darkThemeEnabled$.pipe(
    map(darkThemeEnabled => {
      return darkThemeEnabled ? this.logoRef.light : this.logoRef.dark;
    }),
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly sw: AppServiceWorkerService,
    public readonly store: Store<IChatbotState & ISidebarState & IThemeState>,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {}

  public toggleSidebar(): void {
    this.store.dispatch(sidebarActions.toggle());
  }

  public toggleChatbot(event: boolean): void {
    if (event) {
      this.store.dispatch(chatbotActions.open());
    } else {
      this.store.dispatch(chatbotActions.close());
    }
  }

  public toggleTheme(darkThemeEnabled: boolean): void {
    this.darkTheme = darkThemeEnabled;
    this.store.dispatch(themeActions.toggleDarkTheme());
  }

  public navButtonClick(): void {
    this.store.dispatch(sidebarActions.close({ payload: { navigate: false } }));
  }

  public navigateBack(): void {
    this.store.dispatch(routerActions.back());
  }

  public navigateForward(): void {
    this.store.dispatch(routerActions.forward());
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
