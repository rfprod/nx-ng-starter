import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppMaterialModule } from '@app/client-material';
import { Store, StoreModule } from '@ngrx/store';
import { MarkdownModule, type MarkdownModuleConfig, MARKED_OPTIONS, type MarkedOptions } from 'ngx-markdown';

import { testingProviders } from '../../../testing/testing-providers.mock';
import { mdFilesAction } from '../../modules/md-files/md-files.actions';
import { type IMdFilesState, mdFilesReducerConfig } from '../../modules/md-files/md-files.interface';
import { mdFilesReducerProvider } from '../../modules/md-files/md-files.reducer';
import { AppDocMarkdownReferenceTreeComponent } from './md-reference-tree.component';

describe('AppDocMarkdownReferenceTreeComponent', () => {
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
    imports: [
      NoopAnimationsModule,
      AppMaterialModule.forRoot(),
      StoreModule.forRoot({}),
      StoreModule.forFeature<IMdFilesState>(mdFilesReducerConfig.featureName, mdFilesReducerConfig.token),
      MarkdownModule.forRoot(markdownModuleConfig),
    ],
    declarations: [AppDocMarkdownReferenceTreeComponent],
    providers: [...testingProviders, mdFilesReducerProvider, provideHttpClientTesting(), provideHttpClient(), provideRouter([])],
  };

  let fixture: ComponentFixture<AppDocMarkdownReferenceTreeComponent>;
  let component: AppDocMarkdownReferenceTreeComponent;

  let store: Store<IMdFilesState>;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppDocMarkdownReferenceTreeComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('showReadme should call store.dispatch', () => {
    const filePath = '/README.md';
    component.showReadme(filePath);
    expect(storeDispatchSpy).toHaveBeenCalledWith(mdFilesAction.showReadme({ filePath }));
  });
});
