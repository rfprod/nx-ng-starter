import { OverlayModule } from '@angular/cdk/overlay';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { WINDOW } from '@nx-ng-starter/shared-core/util';
import { DummyComponent } from './ui/components/dummy.component.mock';
import { dialogRefMockProvider } from './util/refs/dialog-ref.mock';
import { overlayRefMockProvider } from './util/refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from './util/refs/snackbar-ref.mock';

@NgModule({
  imports: [
    CommonModule,
    HttpClientTestingModule,
    NgxsModule.forRoot([], { developmentMode: true }),
    NgxsFormPluginModule.forRoot(),
    MatDialogModule,
    OverlayModule,
    MatSnackBarModule,
  ],
  declarations: [DummyComponent],
})
export class MocksCoreModule {
  public static forRoot(): ModuleWithProviders<MocksCoreModule> {
    return {
      ngModule: MocksCoreModule,
      providers: [
        dialogRefMockProvider,
        overlayRefMockProvider,
        matSnackbarRefMockProvider,
        { provide: WINDOW, useValue: window },
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
    };
  }
}
