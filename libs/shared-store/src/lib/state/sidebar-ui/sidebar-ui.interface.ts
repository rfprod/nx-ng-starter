import { IActionPayload } from '@nx-ng-starter/shared-util';
import { Observable } from 'rxjs';

export interface ISiedbarUiStateModel {
  sidebarOpened: boolean;
}

export type TSidebarUiPayload = IActionPayload<ISiedbarUiStateModel>;

export interface ISidebarUiService {
  sidebarOpened$: Observable<boolean>;
}
