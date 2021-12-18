import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { NgxsModule } from '@ngxs/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingEnvironment, testingProviders } from '../../../testing/testing-providers.mock';
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
      NgxsModule.forRoot([AppMdFilesState], { developmentMode: !testingEnvironment.production }),
      MarkdownModule.forRoot(markdownModuleConfig),
    ],
    declarations: [AppDocRootComponent, AppDocMarkdownReferenceTreeComponent, AppDocMarkdownReferenceComponent],
    providers: [...testingProviders],
  };

  let fixture: ComponentFixture<AppDocRootComponent>;
  let component: AppDocRootComponent;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppDocRootComponent);
          component = fixture.debugElement.componentInstance;
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
