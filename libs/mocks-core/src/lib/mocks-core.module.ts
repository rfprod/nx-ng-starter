import { OverlayModule } from '@angular/cdk/overlay';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
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
import { getWindow, WINDOW } from '@nx-ng-starter/shared-core/util';

import { SharedCoreModule } from '../../../shared-core/src/lib/shared-core.module';
import { getDocument } from '../../../shared-core/src/lib/util/general-purpose/factories';
import { httpHandlersProviders, testingEnvironment } from './data-access';
import { DummyComponent } from './ui/components/dummy.component.mock';
import { dialogRefMockProvider } from './util/refs/dialog-ref.mock';
import { overlayRefMockProvider } from './util/refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from './util/refs/snackbar-ref.mock';

export const mocksCoreModuleProviders: Provider[] = [
  dialogRefMockProvider,
  overlayRefMockProvider,
  matSnackbarRefMockProvider,
  ...httpHandlersProviders,
  {
    provide: APP_BASE_HREF,
    useValue: '/',
  },
  { provide: WINDOW, useFactory: getWindow },
  { provide: DOCUMENT, useFactory: getDocument },
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
    SharedCoreModule.forRoot(testingEnvironment),
  ],
  declarations: [DummyComponent],
  exports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    HttpClientTestingModule,
    RouterTestingModule,
    MatDialogModule,
    OverlayModule,
    MatSnackBarModule,
    SharedCoreModule,
    DummyComponent,
  ],
})
export class MocksCoreModule {
  public static forRoot(): ModuleWithProviders<MocksCoreModule> {
    return {
      ngModule: MocksCoreModule,
      providers: [...mocksCoreModuleProviders],
    };
  }
}
