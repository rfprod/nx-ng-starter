import { BreakpointObserver, Breakpoints, type BreakpointState } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppMaterialModule } from '@app/client-material';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { MarkdownModule, type MarkdownModuleConfig, MARKED_OPTIONS, type MarkedOptions } from 'ngx-markdown';
import { of, tap } from 'rxjs';

import { testingProviders } from '../../../testing/testing-providers.mock';
import { DOCUMENTATION_ENVIRONMENT, type IDocumentationEnvironment } from '../../interfaces/environment.interface';
import { AppDocRootComponent } from './root.component';

describe('AppDocRootComponent', () => {
  const markdownModuleConfig: MarkdownModuleConfig = {
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

  const testBedConfig: TestModuleMetadata = {
    imports: [NoopAnimationsModule, AppMaterialModule.forRoot(), MarkdownModule.forRoot(markdownModuleConfig)],
    declarations: [AppDocRootComponent],
    providers: [
      ...testingProviders,
      {
        provide: AppServiceWorkerService,
        useValue: {
          subscribeToUpdates$: of(null),
        },
      },
      provideHttpClientTesting(),
      provideHttpClient(),
      provideRouter([]),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppDocRootComponent>;
  let component: AppDocRootComponent;

  let setTitleSpy: jest.SpyInstance;
  let updateTagSpy: jest.SpyInstance;

  let title: Title;
  let meta: Meta;

  let env: IDocumentationEnvironment;

  let bpObserver: BreakpointObserver;
  let bpObserverSpy: jest.SpyInstance;

  const configureEnvironment = async (bpState?: BreakpointState) => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();

    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);

    setTitleSpy = jest.spyOn(title, 'setTitle');
    updateTagSpy = jest.spyOn(meta, 'updateTag');

    bpObserver = TestBed.inject(BreakpointObserver);
    bpObserverSpy = jest.spyOn(bpObserver, 'observe');
    if (typeof bpState !== 'undefined') {
      bpObserverSpy.mockReturnValue(of({ ...bpState } as BreakpointState));
    }

    fixture = TestBed.createComponent(AppDocRootComponent);
    component = fixture.debugElement.componentInstance;

    env = TestBed.inject(DOCUMENTATION_ENVIRONMENT);

    fixture.detectChanges();
  };

  it('should initialize correctly', async () => {
    await configureEnvironment();
    expect(component).toBeDefined();
    expect(setTitleSpy).toHaveBeenCalledWith(env.appName);
    expect(updateTagSpy).toHaveBeenCalledWith({ description: env.description });
  });

  describe('config$: sidebar closed', () => {
    it('extra small viewport: ', async () => {
      const breakpoints: BreakpointState['breakpoints'] = {};
      breakpoints[Breakpoints.XSmall] = true;
      breakpoints[Breakpoints.Small] = false;
      breakpoints[Breakpoints.Medium] = false;
      breakpoints[Breakpoints.Large] = false;
      breakpoints[Breakpoints.XLarge] = false;

      await configureEnvironment({ breakpoints, matches: true });

      void component.config$
        .pipe(
          tap(result => {
            expect(result.sidenavOpen).toBeFalsy();
          }),
        )
        .subscribe();
    });

    it('small viewport', async () => {
      const breakpoints: BreakpointState['breakpoints'] = {};
      breakpoints[Breakpoints.XSmall] = false;
      breakpoints[Breakpoints.Small] = true;
      breakpoints[Breakpoints.Medium] = false;
      breakpoints[Breakpoints.Large] = false;
      breakpoints[Breakpoints.XLarge] = false;

      await configureEnvironment({ breakpoints, matches: true });

      void component.config$
        .pipe(
          tap(result => {
            expect(result.sidenavOpen).toBeFalsy();
          }),
        )
        .subscribe();
    });
  });

  describe('config$: sidebar open', () => {
    it('medium viewport', async () => {
      const breakpoints: BreakpointState['breakpoints'] = {};
      breakpoints[Breakpoints.XSmall] = false;
      breakpoints[Breakpoints.Small] = false;
      breakpoints[Breakpoints.Medium] = true;
      breakpoints[Breakpoints.Large] = false;
      breakpoints[Breakpoints.XLarge] = false;

      await configureEnvironment({ breakpoints, matches: true });

      void component.config$
        .pipe(
          tap(result => {
            expect(result.sidenavOpen).toBeTruthy();
          }),
        )
        .subscribe();
    });

    it('large viewport', async () => {
      const breakpoints: BreakpointState['breakpoints'] = {};
      breakpoints[Breakpoints.XSmall] = false;
      breakpoints[Breakpoints.Small] = false;
      breakpoints[Breakpoints.Medium] = false;
      breakpoints[Breakpoints.Large] = true;
      breakpoints[Breakpoints.XLarge] = false;

      await configureEnvironment({ breakpoints, matches: true });

      void component.config$
        .pipe(
          tap(result => {
            expect(result.sidenavOpen).toBeTruthy();
          }),
        )
        .subscribe();
    });

    it('extra large viewport', async () => {
      const breakpoints: BreakpointState['breakpoints'] = {};
      breakpoints[Breakpoints.XSmall] = false;
      breakpoints[Breakpoints.Small] = false;
      breakpoints[Breakpoints.Medium] = false;
      breakpoints[Breakpoints.Large] = false;
      breakpoints[Breakpoints.XLarge] = true;

      await configureEnvironment({ breakpoints, matches: true });

      void component.config$
        .pipe(
          tap(result => {
            expect(result.sidenavOpen).toBeTruthy();
          }),
        )
        .subscribe();
    });
  });
});
