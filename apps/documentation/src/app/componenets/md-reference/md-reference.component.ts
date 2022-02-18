import { ChangeDetectionStrategy, Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';

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
  public readonly filePath$ = this.store
    .select(AppMdFilesState.filePath)
    .pipe(map(filePath => this.sanitizer.sanitize(SecurityContext.HTML, filePath)));

  constructor(private readonly store: Store, private readonly sanitizer: DomSanitizer) {}
}
