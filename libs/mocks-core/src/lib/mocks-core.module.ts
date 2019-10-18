import { ModuleWithProviders, NgModule } from '@angular/core';

import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';

import { DummyComponent } from './ui/components/dummy.component.mock';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { dialogRefMockProvider } from './util/refs/dialog-ref.mock';
import { overlayRefMockProvider } from './util/refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from './util/refs/snackbar-ref.mock';

@NgModule({
  imports: [
    CommonModule, HttpClientTestingModule, NgxsModule.forRoot([], { developmentMode: true }),
    NgxsFormPluginModule.forRoot(), MatDialogModule, OverlayModule, MatSnackBarModule,
  ],
  declarations: [DummyComponent],
})
export class MocksCoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MocksCoreModule,
      providers: [
        dialogRefMockProvider, overlayRefMockProvider, matSnackbarRefMockProvider,
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
    };
  }
}
