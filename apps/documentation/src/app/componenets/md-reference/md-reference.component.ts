import { ChangeDetectionStrategy, Component, Inject, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { DOCUMENTATION_ENVIRONMENT, IDocumentationEnvironment } from '../../interfaces/environment.interface';
import { IMdFilesState } from '../../modules/md-files/md-files.interface';
import { mdFilesSelectors } from '../../modules/md-files/md-files.selectors';

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
    .select(mdFilesSelectors.filePath)
    .pipe(map(filePath => this.sanitizer.sanitize(SecurityContext.HTML, filePath)));

  public readonly useEmoji = !this.env.testing;

  constructor(
    private readonly store: Store<IMdFilesState>,
    private readonly sanitizer: DomSanitizer,
    @Inject(DOCUMENTATION_ENVIRONMENT) private readonly env: IDocumentationEnvironment,
  ) {}
}
