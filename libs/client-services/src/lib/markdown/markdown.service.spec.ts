import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppMarkdownService, markdownServiceProvider } from './markdown.service';

describe('AppMarkdownService', () => {
  let service: AppMarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      providers: [markdownServiceProvider],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppMarkdownService);
        spy = {
          service: {
            process: jest.spyOn(service, 'process'),
          },
        };
      });
  }));

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(service.process).toEqual(expect.any(Function));
  });

  it('process should process marked input', () => {
    expect(service.process('input')).toEqual('<p>input</p>\n');
    expect(spy.service.process.mock.calls.length).toBeGreaterThan(0);
  });
});
