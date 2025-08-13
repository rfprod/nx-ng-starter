import { ChangeDetectionStrategy, Component, inject, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { DOCUMENTATION_ENVIRONMENT } from '../../interfaces/environment.interface';
import { IMdFilesState } from '../../modules/md-files/md-files.interface';
import { mdFilesSelector } from '../../modules/md-files/md-files.selectors';

@Component({
  selector: 'app-documentation-md-reference',
  templateUrl: './md-reference.component.html',
  styleUrls: ['./md-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppDocMarkdownReferenceComponent {
  private readonly store = inject(Store<IMdFilesState>);

  private readonly sanitizer = inject(DomSanitizer);

  private readonly env = inject(DOCUMENTATION_ENVIRONMENT);

  /**
   * Selected markdown file path.
   */
  public readonly filePath$ = this.store
    .select(mdFilesSelector.filePath)
    .pipe(map(filePath => this.sanitizer.sanitize(SecurityContext.HTML, filePath)));

  public readonly useEmoji = !this.env.testing;
}
