import { TestBed } from '@angular/core/testing';

import type { IUiDictionary } from '../interfaces';
import { RU, RU_DICTIONARY } from './ru';

describe('Russian shared translations', () => {
  let dictionary: IUiDictionary;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: RU_DICTIONARY,
          useValue: RU,
        },
      ],
    }).compileComponents();
    dictionary = TestBed.inject(RU_DICTIONARY);
  });

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
