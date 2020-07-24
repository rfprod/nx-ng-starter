import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface ISiedbarUiStateModel {
  sidebarOpened: boolean;
}

export type TSidebarUiPayload = IActionPayload<ISiedbarUiStateModel>;

export interface IAppSidebarUiService {
  sidebarOpened$: Observable<boolean>;
}
