import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppClientMaterialModule } from '@app/client-material';
import { AppClientPwaOfflineModule } from '@app/client-pwa-offline';
import { documentProvider, windowProvider } from '@app/client-util';
import { AppRouteSerializer, metaReducers } from '@app/client-util-ngrx';
import { NavigationActionTiming, routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { environment } from '../environments/environment';
import { AppDocMarkdownReferenceComponent } from './componenets/md-reference/md-reference.component';
import { AppDocMarkdownReferenceTreeComponent } from './componenets/md-reference-tree/md-reference-tree.component';
import { AppDocRootComponent } from './componenets/root/root.component';
import { AppDocRoutingModule } from './doc-routing.module';
import { DOC_APP_ENV } from './interfaces/environment.interface';
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
    StoreModule.forRoot({ router: routerReducer }, { metaReducers: metaReducers(environment.production) }),
    AppMdFilesStoreModule.forRoot(),
    AppClientMaterialModule.forRoot(),
    AppClientPwaOfflineModule,
    AppDocRoutingModule,
    StoreRouterConnectingModule.forRoot({
      serializer: AppRouteSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
  ],
  providers: [windowProvider, documentProvider, { provide: DOC_APP_ENV, useValue: environment }],
  bootstrap: [AppDocRootComponent],
})
export class AppDocModule {}
