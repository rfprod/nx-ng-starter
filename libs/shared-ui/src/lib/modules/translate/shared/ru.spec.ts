import { async, TestBed } from '@angular/core/testing';
import { IUiDictionary } from '@nx-ng-starter/shared-core/interfaces';

import { RU, RU_DICTIONARY } from './ru';

describe('Russian shared translations', () => {
  let SHARED_RU: IUiDictionary;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: RU_DICTIONARY,
          useValue: RU,
        },
      ],
      declarations: [],
    })
      .compileComponents()
      .then(() => {
        SHARED_RU = TestBed.inject(RU_DICTIONARY);
      });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    expect(SHARED_RU).toEqual(
      jasmine.objectContaining({
        shared: {
          title: 'NX NG Starter',
        },
      }),
    );
  });
});
