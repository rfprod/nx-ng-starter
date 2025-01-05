import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppMaterialModule } from '@app/client-material';
import { AppPwaOfflineModule } from '@app/client-pwa-offline';
import { AppRouterStoreModule } from '@app/client-store-router';
import { documentProvider, windowProvider } from '@app/client-util';
import { metaReducers } from '@app/client-util-ngrx';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule, MarkdownModuleConfig, MARKED_OPTIONS, MarkedOptions } from 'ngx-markdown';

import { environment } from '../environments/environment';
import { AppDocMarkdownReferenceComponent } from './componenets/md-reference/md-reference.component';
import { AppDocMarkdownReferenceTreeComponent } from './componenets/md-reference-tree/md-reference-tree.component';
import { AppDocRootComponent } from './componenets/root/root.component';
import { AppDocRoutingModule } from './doc-routing.module';
import { DOCUMENTATION_ENVIRONMENT } from './interfaces/environment.interface';
import { AppMdFilesStoreModule } from './modules/md-files/md-files.module';

/**
 * The markdown module configuration.
 */
const markdownModuleConfig: MarkdownModuleConfig = {
  loader: HttpClient,
  markedOptions: {
    provide: MARKED_OPTIONS,
    useValue: {
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
    } as MarkedOptions,
  },
};

/**
 * The documentation application root module.
 */
@NgModule({
  declarations: [AppDocRootComponent, AppDocMarkdownReferenceTreeComponent, AppDocMarkdownReferenceComponent],
  bootstrap: [AppDocRootComponent],
  imports: [
    BrowserAnimationsModule,
    MarkdownModule.forRoot(markdownModuleConfig),
    StoreModule.forRoot({}, { metaReducers: metaReducers(environment.production) }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    EffectsModule.forRoot(),
    AppMdFilesStoreModule.forRoot(),
    AppMaterialModule.forRoot(),
    AppPwaOfflineModule,
    AppDocRoutingModule,
    AppRouterStoreModule.forRoot(),
  ],
  providers: [
    windowProvider,
    documentProvider,
    { provide: DOCUMENTATION_ENVIRONMENT, useValue: environment },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppDocModule {}
