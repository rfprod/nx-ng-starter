import { AfterContentInit, ChangeDetectionStrategy, Component, DestroyRef, HostBinding, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { chatbotAction, chatbotSelector, IChatbotState } from '@app/client-store-chatbot';
import { routerAction } from '@app/client-store-router';
import { ISidebarState, sidebarAction, sidebarSelector } from '@app/client-store-sidebar';
import { IThemeState, themeAction, themeSelector } from '@app/client-store-theme';
import { WEB_CLIENT_APP_ENV } from '@app/client-util';
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
  standalone: false,
})
export class AppRootComponent implements OnInit, AfterContentInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly title = inject(Title);

  private readonly meta = inject(Meta);

  private readonly sw = inject(AppServiceWorkerService);

  public readonly store = inject(Store<IChatbotState & ISidebarState & IThemeState>);

  private readonly env = inject(WEB_CLIENT_APP_ENV);

  /**
   * Defines if UI should use alternative dark material theme.
   * This must be a flag. HostBinding should not use async pipes.
   */
  @HostBinding('class.unicorn-dark-theme') public darkTheme = false;

  /** Sets text size that is inherited by all child views. */
  @HostBinding('class.mat-body-1') public matBody = true;

  /** The name of the application. */
  public readonly appName = this.env.appName;

  /** Logo references. */
  private readonly logoRef: ILogoRef = {
    dark: 'assets/svg/logo.svg',
    light: 'assets/svg/logo-light.svg',
  };

  /** Application release version. */
  public readonly version = this.env.meta.version;

  /** Sidebar state stream. */
  public readonly sidebarOpen$ = this.store.select(sidebarSelector.sidebarOpen);

  /** Chatbot state stream. */
  public readonly chatbotOpen$ = this.store.select(chatbotSelector.chatbotOpen);

  /** Theme state stream. */
  public readonly darkThemeEnabled$ = this.store.select(themeSelector.darkThemeEnabled);

  public readonly logoSrc$ = this.darkThemeEnabled$.pipe(
    map(darkThemeEnabled => (darkThemeEnabled ? this.logoRef.light : this.logoRef.dark)),
  );

  /** Sidebar toggle. */
  public toggleSidebar(): void {
    this.store.dispatch(sidebarAction.toggle());
  }

  /**
   * Chatbot toggle.
   * @param event Next state.
   */
  public toggleChatbot(event: boolean): void {
    if (event) {
      this.store.dispatch(chatbotAction.open());
    } else {
      this.store.dispatch(chatbotAction.close());
    }
  }

  /**
   * Dark theme toggle.
   * @param darkThemeEnabled Dark theme state.
   */
  public toggleTheme(darkThemeEnabled: boolean): void {
    this.darkTheme = darkThemeEnabled;
    this.store.dispatch(themeAction.toggleDarkTheme());
  }

  /** Navigation button click handler. */
  public navButtonClick(): void {
    this.store.dispatch(sidebarAction.close({ payload: { navigate: false } }));
  }

  /** Navigate back handler. */
  public navigateBack(): void {
    this.store.dispatch(routerAction.back());
  }

  /** Navigate forward handler. */
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
