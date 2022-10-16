import { AppMessage } from '@app/backend-interfaces';
import { Observable } from 'rxjs';

export interface IDiagDataItem {
  name: string;
  value: string | number;
}

export type TDiagData = IDiagDataItem[];

export interface IDiagnosticsService {
  ping(): AppMessage;

  static(): Observable<TDiagData>;

  dynamic(): TDiagData;
}
