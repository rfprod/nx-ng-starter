import { async, TestBed } from '@angular/core/testing';

import { AppMarkdownService } from './markdown.service';

describe('AppMarkdownService', () => {
  let service: AppMarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      providers: [
        {
          provide: AppMarkdownService,
          useFactory: () => new AppMarkdownService(),
          deps: [],
        },
      ],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppMarkdownService);
        spy = {
          service: {
            process: jest
              .spyOn(service, 'process')
              .mockImplementation((input: string) => `marked ${input}`),
          },
        };
      });
  }));

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(service.process).toEqual(jasmine.any(Function));
  });

  it('process should process marked input', () => {
    expect(service.process('input')).toEqual('marked input');
    expect(spy.service.process.mock.calls.length).toBeGreaterThan(0);
  });
});
