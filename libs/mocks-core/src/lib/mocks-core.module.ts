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
import { AppMaterialModule } from '@nx-ng-starter/shared-ui';
import { getDocument, getWindow, WINDOW } from '@nx-ng-starter/shared-util';

import { environment } from '../../../../apps/nx-ng-starter/src/environments/environment';
import { AppSharedCoreModule } from '../../../shared-core/src/lib/shared-core.module';
import { WebsocketModule } from '../../../shared-store/src/lib/state/websocket/websocket.module';
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
    AppMaterialModule.forRoot(),
    HttpClientTestingModule,
    RouterTestingModule,
    NgxsModule.forRoot([], { developmentMode: true }),
    NgxsFormPluginModule.forRoot(),
    MatDialogModule,
    OverlayModule,
    MatSnackBarModule,
    AppSharedCoreModule.forRoot(testingEnvironment),
    WebsocketModule.forRoot(environment),
  ],
  declarations: [DummyComponent],
  exports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    HttpClientTestingModule,
    RouterTestingModule,
    MatDialogModule,
    OverlayModule,
    MatSnackBarModule,
    AppSharedCoreModule,
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
