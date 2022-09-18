import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from '@app/client-material';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingProviders } from '../../../testing/testing-providers.mock';
import { AppMdFilesStoreModule } from '../../modules/md-files/md-files.module';
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
      AppMaterialModule.forRoot(),
      StoreModule.forRoot({}),
      AppMdFilesStoreModule.forRoot(),
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
