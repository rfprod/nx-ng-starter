import { TestBed, async } from '@angular/core/testing';

import { MarkdownService } from './markdown.service';

declare let marked;

describe('MarkdownService', () => {

  let service: MarkdownService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MarkdownService,
          useFactory: () => new MarkdownService(),
          deps: []
        }
      ]
    }).compileComponents().then(() => {
      service = TestBed.get(MarkdownService) as MarkdownService;
      spy = {
        service: spyOn(service, 'process').and.callFake(() => (input: string) => `marked ${input}`)
      };
    });
  }));

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(service.process).toEqual(jasmine.any(Function));
  });

  it('process should process marked input', () => {
    expect(service.process('input')).toEqual('marked input');
  });

});
