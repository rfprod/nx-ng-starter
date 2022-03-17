import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMarkdownService } from '@app/client-services';
import { AppHttpApiState } from '@app/client-store-http-api';
import { AppClientTranslateModule } from '@app/client-translate';
import {
  flushHttpRequests,
  getTestBedConfig,
  newTestBedMetadata,
  spyOnFunctions,
  TClassMemberFunctionSpiesObject,
} from '@app/client-unit-testing';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { NgxsModule, Store } from '@ngxs/store';
import { combineLatest, first, tap } from 'rxjs';

import { AppDiagnosticsInfoComponent } from './diagnostics-info.component';

describe('AppDiagnosticsInfoComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsInfoComponent],
    imports: [
      NgxsModule.forFeature([AppHttpApiState]),
      AppClientTranslateModule.forRoot(),
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsInfoComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsInfoComponent>;
  let component: AppDiagnosticsInfoComponent;
  let componentSpy: TClassMemberFunctionSpiesObject<AppDiagnosticsInfoComponent>;
  let service: AppMarkdownService;
  let store: Store;

  let env: IWebClientAppEnvironment;

  let httpController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(AppDiagnosticsInfoComponent);
        component = fixture.componentInstance;
        componentSpy = spyOnFunctions<AppDiagnosticsInfoComponent>(component);
        service = TestBed.inject(AppMarkdownService);
        store = TestBed.inject(Store);
        env = TestBed.inject(WEB_CLIENT_APP_ENV);
        flushHttpRequests(httpController);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(componentSpy).toBeDefined();
  });

  it('markedInstructions should return processed markdown', waitForAsync(() => {
    const apiInstructions = `# API endpoints:\n
    - ${env.api}/auth
    - ${env.api}/signup
    - ${env.api}/login
    - ${env.api}/logout
    - ${env.api}/mailer
    - ${env.api}/mail
    - ${env.api}/grpc
    - ${env.api}/grpc/:id`;
    const expected = service.process(apiInstructions);
    void component.markedInstructions$
      .pipe(
        tap(instructions => {
          expect(instructions).toEqual(expected);
        }),
      )
      .subscribe();
  }));

  it('state should return the whole ping state', waitForAsync(() => {
    void combineLatest([component.ping$.pipe(first()), store.selectOnce(AppHttpApiState.state)])
      .pipe(
        tap(([ping, pingState]) => {
          expect(ping).toEqual(pingState.ping);
        }),
      )
      .subscribe();
  }));
});
