import { Injectable, Provider } from '@angular/core';
import { marked } from 'marked';
import memo from 'memo-decorator';

/**
 * Markdown service.
 * Processes string in markdown format, outputs html.
 */
@Injectable({
  providedIn: 'root',
})
export class AppMarkdownService {
  /**
   * Processes markdown input.
   */
  @memo()
  public process(input: string): string {
    return marked(input);
  }
}

export const markdownServiceProvider: Provider = {
  provide: AppMarkdownService,
  useFactory: () => new AppMarkdownService(),
};
