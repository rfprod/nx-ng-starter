import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { AppMdFilesState } from '../../modules/store/md-files/md-files.state';

@Component({
  selector: 'app-documentation-md-reference',
  templateUrl: './md-reference.component.html',
  styleUrls: ['./md-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocMarkdownReferenceComponent {
  /**
   * Selected markdown file path.
   */
  public readonly filePath$ = this.store.select(AppMdFilesState.getSelectedFilePath);

  constructor(private readonly store: Store) {}
}
