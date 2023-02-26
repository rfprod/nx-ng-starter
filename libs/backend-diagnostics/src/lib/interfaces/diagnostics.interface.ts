import { Observable } from 'rxjs';

export interface IDiagDataItem {
  name: string;
  value: string | number;
}

export interface IPingResult {
  message: string;
}

export type TDiagData = IDiagDataItem[];

export interface IUserCountEvent {
  event: 'users';
  data: IDiagDataItem[];
}

export interface IDiagnosticsService {
  ping(): IPingResult;

  static(): Observable<TDiagData>;

  dynamic(): TDiagData;
}

export const dianosticEventsGatewayPort = 8081;
