import { TestBed, async } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';

describe('MarkdownService', () => {
  let service: MarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MarkdownService,
          useFactory: () => new MarkdownService(),
          deps: [],
        },
      ],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.inject(MarkdownService);
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
