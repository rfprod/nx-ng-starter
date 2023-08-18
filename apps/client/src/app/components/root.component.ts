import { AfterContentInit, ChangeDetectionStrategy, Component, DestroyRef, HostBinding, Inject, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { chatbotAction, chatbotSelector, IChatbotState } from '@app/client-store-chatbot';
import { routerAction } from '@app/client-store-router';
import { ISidebarState, sidebarAction, sidebarSelector } from '@app/client-store-sidebar';
import { IThemeState, themeAction, themeSelector } from '@app/client-store-theme';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

interface ILogoRef {
  dark: 'assets/svg/logo.svg';
  light: 'assets/svg/logo-light.svg';
}

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRootComponent implements OnInit, AfterContentInit {
  private readonly destroyRef = inject(DestroyRef);

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

  public readonly sidebarOpen$ = this.store.select(sidebarSelector.sidebarOpen);

  public readonly chatbotOpen$ = this.store.select(chatbotSelector.chatbotOpen);

  public readonly darkThemeEnabled$ = this.store.select(themeSelector.darkThemeEnabled);

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
    this.store.dispatch(sidebarAction.toggle());
  }

  public toggleChatbot(event: boolean): void {
    if (event) {
      this.store.dispatch(chatbotAction.open());
    } else {
      this.store.dispatch(chatbotAction.close());
    }
  }

  public toggleTheme(darkThemeEnabled: boolean): void {
    this.darkTheme = darkThemeEnabled;
    this.store.dispatch(themeAction.toggleDarkTheme());
  }

  public navButtonClick(): void {
    this.store.dispatch(sidebarAction.close({ payload: { navigate: false } }));
  }

  public navigateBack(): void {
    this.store.dispatch(routerAction.back());
  }

  public navigateForward(): void {
    this.store.dispatch(routerAction.forward());
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
    void this.sw.subscribeToUpdates$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
