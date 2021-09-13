import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { DOC_APP_ENV, IDocAppEnvironment } from '../../interfaces/environment.interface';

@Component({
  selector: 'app-documentation-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocRootComponent implements OnInit {
  public inlineTitle = this.env.appName;

  constructor(private readonly title: Title, private readonly meta: Meta, @Inject(DOC_APP_ENV) private readonly env: IDocAppEnvironment) {}

  /**
   * Lifecycle hook called on component initialization.
   * When called does the following:
   * - sets document title;
   * - sets document description;
   */
  public ngOnInit(): void {
    this.title.setTitle(this.env.appName);
    this.meta.updateTag({ description: this.env.description });
  }
}
