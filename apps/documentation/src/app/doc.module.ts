import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppClientMaterialModule } from '@app/client-material';
import { AppClientPwaOfflineModule } from '@app/client-pwa-offline';
import { AppRouterStoreModule } from '@app/client-store-router';
import { documentProvider, windowProvider } from '@app/client-util';
import { metaReducers } from '@app/client-util-ngrx';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

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
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
    },
  },
};

/**
 * The documentation application root module.
 */
@NgModule({
  declarations: [AppDocRootComponent, AppDocMarkdownReferenceTreeComponent, AppDocMarkdownReferenceComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    MarkdownModule.forRoot(markdownModuleConfig),
    FlexLayoutModule,
    StoreModule.forRoot({}, { metaReducers: metaReducers(environment.production) }),
    AppMdFilesStoreModule.forRoot(),
    AppClientMaterialModule.forRoot(),
    AppClientPwaOfflineModule,
    AppDocRoutingModule,
    AppRouterStoreModule.forRoot(),
  ],
  providers: [windowProvider, documentProvider, { provide: DOCUMENTATION_ENVIRONMENT, useValue: environment }],
  bootstrap: [AppDocRootComponent],
})
export class AppDocModule {}
