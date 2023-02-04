import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { catchError, combineLatest, concat, filter, first, from, interval, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceWorkerService {
  /**
   * Application state stream.
   */
  private readonly appStable$ = this.appRef.isStable.pipe(first(isStable => isStable));

  /**
   * Service worker update interval.
   */
  private get updateInterval() {
    const hours = 6;
    const minutes = 60;
    const seconds = 60;
    const miliseconds = 1000;
    return hours * minutes * seconds * miliseconds;
  }

  /**
   * Service worker update interval stream.
   */
  private readonly updateInterval$ = interval(this.updateInterval);

  /**
   * Application version update stream.
   * Streams version updates and displays messages in the UI.
   */
  private readonly versionUpdate$ = this.service.versionUpdates.pipe(
    map(event => {
      switch (event.type) {
        case 'VERSION_DETECTED':
          this.displaySnackBar(`Downloading new app version: ${event.version.hash}`);
          return null;
        case 'VERSION_INSTALLATION_FAILED':
          this.displaySnackBar(`Failed to install app version '${event.version.hash}': ${event.error}`);
          return null;
        case 'VERSION_READY':
          this.displaySnackBar(`Current app version: ${event.currentVersion.hash}`);
          this.displaySnackBar(`New app version ready for use: ${event.latestVersion.hash}`);
          return event;
        default:
          return null;
      }
    }),
  );

  /**
   * Application update check stream.
   * Checks for available update and prompts the user to update the application.
   */
  private readonly checkForUpdates$ = concat(this.appStable$, this.updateInterval$).pipe(
    switchMap(() => from(this.service.checkForUpdate())),
    catchError((error: Error) => {
      this.displaySnackBar(`Failed to check for updates. ${error.message}`, void 0);
      return of(false);
    }),
    filter(update => update),
    tap(() => {
      this.displaySnackBar(
        'There is an application update available. It is recommended to update to avoid unexpected behavior.',
        'Update',
        {
          duration: Number(Infinity),
        },
        true,
      );
    }),
  );

  /**
   * Should be used in the application root component.
   */
  public readonly subscribeToUpdates$ = combineLatest([this.versionUpdate$, this.checkForUpdates$]);

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly service: SwUpdate,
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  /**
   * Displays a snackbar.
   * @param message message to display
   * @param action snackbar action
   * @param config snackbar config
   * @param refreshPage whether to refresh the page on snackbar action
   */
  private displaySnackBar(message: string, action?: string, config?: MatSnackBarConfig, refreshPage?: boolean): void {
    this.zone.run(() => {
      const bar = this.snackBar.open(message, action, config);
      if (refreshPage === true) {
        this.refreshPage(bar);
      }
    });
  }

  /**
   * Refreshes the page on snackbar action.
   * @param ref snackbar reference
   */
  private refreshPage(ref: MatSnackBarRef<TextOnlySnackBar>): void {
    void ref
      .onAction()
      .pipe(
        tap(() => {
          this.document.location.reload();
        }),
      )
      .subscribe();
  }
}
