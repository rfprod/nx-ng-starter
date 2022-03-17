import { TestBed, waitForAsync } from '@angular/core/testing';

import { IUiDictionary } from '../interfaces';
import { RU, RU_DICTIONARY } from './ru';

describe('Russian shared translations', () => {
  let dictionary: IUiDictionary;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      providers: [
        {
          provide: RU_DICTIONARY,
          useValue: RU,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        dictionary = TestBed.inject(RU_DICTIONARY);
      });
  }));

  it('should create the app', () => {
    expect(dictionary).toEqual(
      expect.objectContaining({
        shared: {
          title: 'NX NG Starter',
        },
      }),
    );
  });
});
