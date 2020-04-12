import { OverlayModule } from '@angular/cdk/overlay';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CustomMaterialModule } from '@nx-ng-starter/shared-core/ui';
import { WINDOW } from '@nx-ng-starter/shared-core/util';
import { DummyComponent } from './ui/components/dummy.component.mock';
import { dialogRefMockProvider } from './util/refs/dialog-ref.mock';
import { overlayRefMockProvider } from './util/refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from './util/refs/snackbar-ref.mock';

export const mocksCoreModuleProviders: Provider[] = [
  dialogRefMockProvider,
  overlayRefMockProvider,
  matSnackbarRefMockProvider,
  { provide: WINDOW, useValue: window },
  {
    provide: APP_BASE_HREF,
    useValue: '/',
  },
];

@NgModule({
  imports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule.forRoot(),
    HttpClientTestingModule,
    RouterTestingModule,
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
      providers: [...mocksCoreModuleProviders],
    };
  }
}
