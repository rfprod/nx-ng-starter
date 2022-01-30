import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Meta, Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { NgxsModule } from '@ngxs/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingEnvironment, testingProviders } from '../../../testing/testing-providers.mock';
import { DOC_APP_ENV, IDocAppEnvironment } from '../../interfaces/environment.interface';
import { AppMdFilesState } from '../../modules/store/md-files/md-files.state';
import { AppDocMarkdownReferenceComponent } from '../md-reference/md-reference.component';
import { AppDocMarkdownReferenceTreeComponent } from '../md-reference-tree/md-reference-tree.component';
import { AppDocRootComponent } from './root.component';

describe('AppDocRootComponent', () => {
  const markdownModuleConfig: MarkdownModuleConfig = {
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

  const testBedConfig: TestModuleMetadata = {
    imports: [
      NoopAnimationsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      AppClientMaterialModule.forRoot(),
      FlexLayoutModule,
      NgxsModule.forRoot([AppMdFilesState], { developmentMode: !testingEnvironment.production }),
      MarkdownModule.forRoot(markdownModuleConfig),
    ],
    declarations: [AppDocRootComponent, AppDocMarkdownReferenceTreeComponent, AppDocMarkdownReferenceComponent],
    providers: [...testingProviders],
  };

  let fixture: ComponentFixture<AppDocRootComponent>;
  let component: AppDocRootComponent;

  let setTitleSpy: jest.SpyInstance;
  let updateTagSpy: jest.SpyInstance;

  let title: Title;
  let meta: Meta;

  let env: IDocAppEnvironment;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          title = TestBed.inject(Title);
          meta = TestBed.inject(Meta);

          setTitleSpy = jest.spyOn(title, 'setTitle');
          updateTagSpy = jest.spyOn(meta, 'updateTag');

          fixture = TestBed.createComponent(AppDocRootComponent);
          component = fixture.debugElement.componentInstance;

          env = TestBed.inject(DOC_APP_ENV);

          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit should set title and update meta tag', () => {
    expect(setTitleSpy).toHaveBeenCalledWith(env.appName);
    expect(updateTagSpy).toHaveBeenCalledWith({ description: env.description });
  });
});
