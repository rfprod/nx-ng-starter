import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from '@app/client-material';
import { Store, StoreModule } from '@ngrx/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingProviders } from '../../../testing/testing-providers.mock';
import { mdFilesActions } from '../../modules/md-files/md-files.actions';
import { IMdFilesState } from '../../modules/md-files/md-files.interface';
import { AppMdFilesStoreModule } from '../../modules/md-files/md-files.module';
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
      AppMaterialModule.forRoot(),
      StoreModule.forRoot({}),
      AppMdFilesStoreModule.forRoot(),
      MarkdownModule.forRoot(markdownModuleConfig),
    ],
    declarations: [AppDocMarkdownReferenceTreeComponent],
    providers: [...testingProviders],
  };

  let fixture: ComponentFixture<AppDocMarkdownReferenceTreeComponent>;
  let component: AppDocMarkdownReferenceTreeComponent;

  let store: Store<IMdFilesState>;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDocMarkdownReferenceTreeComponent);
        component = fixture.debugElement.componentInstance;

        store = TestBed.inject(Store);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('showReadme should call store.dispatch', () => {
    const filePath = '/README.md';
    component.showReadme(filePath);
    expect(storeDispatchSpy).toHaveBeenCalledWith(mdFilesActions.showReadme({ filePath }));
  });
});
