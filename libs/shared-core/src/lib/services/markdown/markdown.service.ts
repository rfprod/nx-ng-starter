import { Injectable } from '@angular/core';
import marked from 'marked';
import memo from 'memo-decorator';

/**
 * Markdown service.
 * Processes string in markdown format, outputs html.
 */
@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  /**
   * Processes markdown input.
   * @param input marked input
   */
  @memo()
  public process(input: string): string {
    return marked(input);
  }
}
