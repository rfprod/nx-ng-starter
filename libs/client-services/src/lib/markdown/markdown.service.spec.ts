import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppMarkdownService, markdownServiceProvider } from './markdown.service';

describe('AppMarkdownService', () => {
  let service: AppMarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        providers: [markdownServiceProvider],
      })
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppMarkdownService);
          spy = {
            service: {
              process: jest.spyOn(service, 'process').mockImplementation((input: string) => `marked ${input}`),
            },
          };
        });
    }),
  );

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(service.process).toEqual(jasmine.any(Function));
  });

  it('process should process marked input', () => {
    expect(service.process('input')).toEqual('marked input');
    expect(spy.service.process.mock.calls.length).toBeGreaterThan(0);
  });
});
