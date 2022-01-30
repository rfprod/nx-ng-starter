import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@app/client-material';
import { NgxsModule, Store } from '@ngxs/store';
import { switchMapTo, tap } from 'rxjs';

import { testingEnvironment, testingProviders } from '../../../../testing/testing-providers.mock';
import { AppMdFilesState, mdFilesActions } from './md-files.state';

describe('AppMdFilesState', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [
      NoopAnimationsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      AppClientMaterialModule.forRoot(),
      NgxsModule.forRoot([AppMdFilesState], { developmentMode: !testingEnvironment.production }),
    ],
    providers: [...testingProviders],
  };

  let store: Store;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          store = TestBed.inject(Store);
        });
    }),
  );

  it(
    'state selector should return the whole state',
    waitForAsync(() => {
      const expectedState = { filePath: '', mdFilePaths: [] };
      void store
        .dispatch(new mdFilesActions.setState(expectedState))
        .pipe(
          switchMapTo(store.selectOnce(AppMdFilesState.state)),
          tap(mdFilesState => {
            expect(mdFilesState).toEqual(expectedState);
          }),
        )
        .subscribe();
    }),
  );

  it(
    'mdFilePaths selector should return partial state',
    waitForAsync(() => {
      const expectedState = { filePath: '', mdFilePaths: [] };
      void store
        .dispatch(new mdFilesActions.setState(expectedState))
        .pipe(
          switchMapTo(store.selectOnce(AppMdFilesState.mdFilePaths)),
          tap(mdFilesState => {
            expect(mdFilesState).toEqual(expectedState.mdFilePaths);
          }),
        )
        .subscribe();
    }),
  );

  it(
    'filePath selector should return partial state',
    waitForAsync(() => {
      const expectedState = { filePath: '', mdFilePaths: [] };
      void store
        .dispatch(new mdFilesActions.setState(expectedState))
        .pipe(
          switchMapTo(store.selectOnce(AppMdFilesState.filePath)),
          tap(mdFilesState => {
            expect(mdFilesState).toEqual(expectedState.filePath);
          }),
        )
        .subscribe();
    }),
  );
});
