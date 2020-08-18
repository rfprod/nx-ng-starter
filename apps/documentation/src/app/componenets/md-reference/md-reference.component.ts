import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOC_APP_ENV, IDocAppEnvironment } from '../../interfaces/environment.interface';
import { Store } from '@ngxs/store';
import { MdFilesState } from '../../modules/store/md-files/md-files.store';

/**
 * TODO: this component should read from the store, and use markown file source from there. Then use it in the template.
 */

@Component({
  selector: 'transport-documentation-md-reference',
  templateUrl: './md-reference.component.html',
  styleUrls: ['./md-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocMarkdownReferenceComponent implements OnInit {
  /**
   * Selected markdown file path.
   */
  public readonly filePath$ = this.store.select(MdFilesState.getSelectedFilePath);

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
