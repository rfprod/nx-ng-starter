import { Injectable } from '@angular/core';

/**
 * Declaration of globaly registered marked library.
 */
declare let marked;

/**
 * Markdown service.
 * Processes string in markdown format, outputs html.
 */
@Injectable()
export class MarkdownService {
  /**
   * Processes markdown input.
   * @param input marked input
   */
  public process(input: string): string {
    return marked(input);
  }
}
