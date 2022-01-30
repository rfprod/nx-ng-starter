import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { NgxsModule, Store } from '@ngxs/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingEnvironment, testingProviders } from '../../../testing/testing-providers.mock';
import { AppMdFilesState, mdFilesActions } from '../../modules/store/md-files/md-files.state';
import { AppDocMarkdownReferenceTreeComponent } from './md-reference-tree.component';

describe('AppDocMarkdownReferenceTreeComponent', () => {
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
    declarations: [AppDocMarkdownReferenceTreeComponent],
    providers: [...testingProviders],
  };

  let fixture: ComponentFixture<AppDocMarkdownReferenceTreeComponent>;
  let component: AppDocMarkdownReferenceTreeComponent;

  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppDocMarkdownReferenceTreeComponent);
          component = fixture.debugElement.componentInstance;

          store = TestBed.inject(Store);
          storeDispatchSpy = jest.spyOn(store, 'dispatch');

          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('showReadme should call store.dispatch', () => {
    const filePath = '/README.md';
    component.showReadme(filePath);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new mdFilesActions.setState({ filePath }));
  });
});
