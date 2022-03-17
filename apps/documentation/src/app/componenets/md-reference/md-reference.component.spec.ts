import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { NgxsModule } from '@ngxs/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingEnvironment, testingProviders } from '../../../testing/testing-providers.mock';
import { AppMdFilesState } from '../../modules/store/md-files/md-files.state';
import { AppDocMarkdownReferenceComponent } from './md-reference.component';

describe('AppDocMarkdownReferenceComponent', () => {
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
    declarations: [AppDocMarkdownReferenceComponent],
    providers: [...testingProviders],
  };

  let fixture: ComponentFixture<AppDocMarkdownReferenceComponent>;
  let component: AppDocMarkdownReferenceComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDocMarkdownReferenceComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
