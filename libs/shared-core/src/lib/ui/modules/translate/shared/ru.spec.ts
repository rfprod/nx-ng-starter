import { TestBed, async } from '@angular/core/testing';

import { RU } from './ru';

describe('Russian shared translations', () => {
  let SHARED_RU: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: RU,
          useValue: RU,
        },
      ],
      declarations: [],
    })
      .compileComponents()
      .then(() => {
        SHARED_RU = TestBed.get(RU);
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
