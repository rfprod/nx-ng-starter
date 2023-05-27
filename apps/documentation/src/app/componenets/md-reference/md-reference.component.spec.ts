import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from '@app/client-material';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule, MarkdownModuleConfig, MarkedOptions } from 'ngx-markdown';

import { testingProviders } from '../../../testing/testing-providers.mock';
import { IMdFilesState, mdFilesReducerConfig } from '../../modules/md-files/md-files.interface';
import { mdFilesReducerProvider } from '../../modules/md-files/md-files.reducer';
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
      StoreModule.forFeature<IMdFilesState>(mdFilesReducerConfig.featureName, mdFilesReducerConfig.token),
      MarkdownModule.forRoot(markdownModuleConfig),
    ],
    declarations: [AppDocMarkdownReferenceComponent],
    providers: [...testingProviders, mdFilesReducerProvider],
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
