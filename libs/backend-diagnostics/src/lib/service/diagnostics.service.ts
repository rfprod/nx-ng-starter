import { Message } from '@app/backend-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { exec, ExecException } from 'child_process';
import * as dotenv from 'dotenv';
import * as os from 'os';
import { catchError, map, Observable, of } from 'rxjs';

export interface IDiagDataItem {
  name: string;
  value: string | number;
}

export type TDiagData = IDiagDataItem[];

export const CHILD_PROCESS_EXEC = 'CHILD_PROCESS_EXEC';

@Injectable()
export class BackendDiagnosticsService {
  constructor(@Inject(CHILD_PROCESS_EXEC) private readonly childProcessExec: typeof exec) {
    dotenv.config();
  }

  private npmVersion() {
    const observable = new Observable<string>(subscriber => {
      let version = 'N/A';
      if (typeof process.env.ELECTRON !== 'undefined') {
        subscriber.next(version);
        subscriber.complete();
      }
      this.childProcessExec('npm --version', (error: ExecException | null, stdout: string, stderr: string) => {
        if (error !== null) {
          subscriber.error(version);
        }
        version = stdout.toString().replace(os.EOL, '');
        subscriber.next(version);
        subscriber.complete();
      });
    });
    return observable.pipe(catchError(error => of(error)));
  }

  public ping(): Message {
    return new Message({
      message: 'Diagnostics service is online. Routes: /, /static.',
    });
  }

  public static(): Observable<TDiagData> {
    return this.npmVersion().pipe(
      map(
        npmVersion =>
          <TDiagData>[
            {
              name: 'Node.js Version',
              value: process.version.replace('v', ''),
            },
            {
              name: 'NPM Version',
              value: npmVersion,
            },
            {
              name: 'OS Type',
              value: os.type(),
            },
            {
              name: 'OS Platform',
              value: os.platform(),
            },
            {
              name: 'OS Architecture',
              value: os.arch(),
            },
            {
              name: 'OS Release',
              value: os.release(),
            },
            {
              name: 'CPU Cores',
              value: os.cpus().length,
            },
          ],
      ),
    );
  }

  public dynamic(): TDiagData {
    const divider = 1048576;
    return <TDiagData>[
      {
        name: 'Free Memory',
        value: `${Math.round(os.freemem() / divider)}MB`,
      },
      {
        name: 'Uptime',
        value: `${os.uptime()}s`,
      },
    ];
  }
}
