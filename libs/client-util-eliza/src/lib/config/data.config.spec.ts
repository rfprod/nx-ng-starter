import { TestBed } from '@angular/core/testing';

import { IElizaData, IElizaKeywordRule } from '../interfaces/eliza.interface';
import { ELIZA_DATA, elizaData, elizaDataProvider } from './data.config';

describe('elizaData', () => {
  let data: IElizaData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [elizaDataProvider(elizaData)],
    }).compileComponents();

    data = TestBed.inject(ELIZA_DATA);
  });

  it('should be provided via an injection token', () => {
    expect(data).toBeDefined();
  });

  it('should have specific object structure', () => {
    expect(data).toMatchObject({
      initials: expect.any(Array<string>),
      finals: expect.any(Array<string>),
      quits: expect.any(Array<string>),
      pres: expect.any(Array<string>),
      posts: expect.any(Array<string>),
      synonyms: expect.any(Object),
      keywords: expect.any(Array<IElizaKeywordRule>),
      postTransforms: expect.any(Array<{ searchValue: RegExp; replaceValue: string }>),
    });

    const expectedLength = {
      finals: 5,
      initials: 3,
      keywords: 42,
      postTransforms: 7,
      posts: 12,
      pres: 34,
      quits: 5,
      synonyms: 8,
    };
    expect(data.finals.length).toEqual(expectedLength.finals);
    expect(data.initials.length).toEqual(expectedLength.initials);
    expect(data.keywords.length).toEqual(expectedLength.keywords);
    expect(data.postTransforms.length).toEqual(expectedLength.postTransforms);
    expect(data.posts.length).toEqual(expectedLength.posts);
    expect(data.pres.length).toEqual(expectedLength.pres);
    expect(data.quits.length).toEqual(expectedLength.quits);
    expect(Object.keys(data.synonyms).length).toEqual(expectedLength.synonyms);
  });
});
