import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  EventEmitterService,
  MarkdownService
} from '@nx-ng-starter/shared-core/data-access';

import { untilDestroyed } from 'ngx-take-until-destroy';

/**
 * Application index component.
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppIndexComponent implements OnInit, OnDestroy {

  /**
   * Constructor.
   * @param emitter event emitter service
   * @param markdown markdown service
   * @param route activated route
   */
  constructor(
    private emitter: EventEmitterService,
    private markdown: MarkdownService,
    private route: ActivatedRoute
  ) {}

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
    this.emitter.getEmitter().pipe(untilDestroyed(this)).subscribe((event: any) => {
      console.log('AppIndexComponent, event emitter subscription', event);
    });

    this.route.queryParamMap.pipe(untilDestroyed(this)).subscribe((queryParams: Params) => {
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
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {}

}
