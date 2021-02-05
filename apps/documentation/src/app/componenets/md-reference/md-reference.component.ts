import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';

import { DOC_APP_ENV, IDocAppEnvironment } from '../../interfaces/environment.interface';
import { AppMdFilesState } from '../../modules/store/md-files/md-files.store';

@Component({
  selector: 'app-documentation-md-reference',
  templateUrl: './md-reference.component.html',
  styleUrls: ['./md-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocMarkdownReferenceComponent implements OnInit {
  /**
   * Selected markdown file path.
   */
  public readonly filePath$ = this.store.select(AppMdFilesState.getSelectedFilePath);

  constructor(
    private readonly title: Title,
    private readonly store: Store,
    @Inject(DOC_APP_ENV) private readonly env: IDocAppEnvironment,
  ) {}

  /**
   * Lifecycle hook called on component initialization.
   * When called does the following:
   * - sets document title;
   */
  public ngOnInit(): void {
    this.title.setTitle(`${this.env.appName}: Nx Ng Starter`);
  }
}
