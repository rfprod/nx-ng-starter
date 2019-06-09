import { Component, Inject, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventEmitterService } from 'libs/data-access/event-emitter/event-emitter.service';
import { MarkdownService } from 'libs/data-access/markdown/markdown.service';

/**
 * Application index component.
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.css']
})
export class AppIndexComponent implements OnInit, OnDestroy {

  constructor(
    private el: ElementRef,
    private emitter: EventEmitterService,
    private markdown: MarkdownService,
    private route: ActivatedRoute,
    @Inject('Window') private window: Window
  ) {
    // console.log('AppIndexComponent, element ref', this.el);
  }

  /**
   * Component subscriptions.
   */
  private subscriptions: any[] = [];

  /**
   * Component title.
   */
  public title: string = 'Components library directory';

  /**
   * Demo state.
   */
  public demo: any = {
    off: true,
    customButton: false
  };

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedIntro(): string {
    return this.processMarkdown('# You can use Markdown \n\n via MarkdownService, just like in this example.');
  }

  /**
   * Processes arbitrary text in markdown format.
   * @param input input string in markdown format.
   */
  private processMarkdown(input: string): string {
    console.log(this.markdown.process(input));
    return this.markdown.process(input);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    let sub = this.emitter.getEmitter().subscribe((event: any) => {
      console.log('AppIndexComponent, event emitter subscription', event);
    });
    this.subscriptions.push(sub);

    /*
    *	subscribe to query params changes and switch display mode
    */
    sub = this.route.queryParamMap.subscribe((queryParams: Params) => {
      let selectedItem: string = queryParams.get('demo');
      // console.log('selectedItem', selectedItem)
      if (!selectedItem) {
        selectedItem = 'off';
      }
      for (const key in this.demo) {
        // console.log('key', key);
        this.demo[key] = (key === selectedItem) ? true : false;
      }
    });
    this.subscriptions.push(sub);
  }
  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    if (this.subscriptions.length) {
      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }
    }
  }
}
