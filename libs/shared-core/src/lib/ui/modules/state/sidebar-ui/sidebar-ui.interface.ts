import { IActionPayload } from '@nx-ng-starter/shared-core/util';
import { Observable } from 'rxjs';

export interface ISiedbarUiStateModel {
  sidebarOpened: boolean;
}

export type TSidebarUiPayload = IActionPayload<ISiedbarUiStateModel>;

export interface ISidebarUiService {
  sidebarOpened$: Observable<boolean>;
}
