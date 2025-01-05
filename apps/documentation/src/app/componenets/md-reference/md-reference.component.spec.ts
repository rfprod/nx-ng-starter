import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppMaterialModule } from '@app/client-material';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule, type MarkdownModuleConfig, MARKED_OPTIONS, type MarkedOptions } from 'ngx-markdown';

import { testingProviders } from '../../../testing/testing-providers.mock';
import { type IMdFilesState, mdFilesReducerConfig } from '../../modules/md-files/md-files.interface';
import { mdFilesReducerProvider } from '../../modules/md-files/md-files.reducer';
import { AppDocMarkdownReferenceComponent } from './md-reference.component';

describe('AppDocMarkdownReferenceComponent', () => {
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
    declarations: [AppDocMarkdownReferenceComponent],
    providers: [...testingProviders, mdFilesReducerProvider, provideHttpClientTesting(), provideHttpClient(), provideRouter([])],
  };

  let fixture: ComponentFixture<AppDocMarkdownReferenceComponent>;
  let component: AppDocMarkdownReferenceComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppDocMarkdownReferenceComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
