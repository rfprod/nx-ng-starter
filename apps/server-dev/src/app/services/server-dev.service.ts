import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class AppServerDevService {
  public readonly spawn = spawn;

  public resetEnvironments() {
    Logger.verbose(`\n${new Date(Date.now())}: Dev server > Resetting environment variables...\n`);

    const child = this.spawn('npx', ['nx', 'run-many', '--target', 'configure-env', '--all', '--reset'], {
      stdio: 'inherit',
      detached: true,
    });
    child.on('close', code => {
      const errorCode = 8;
      if (code === errorCode) {
        Logger.error('Dev server > Error detected, waiting for changes...');
      } else {
        Logger.error('Dev server > Error detected, exiting...');
      }
    });
  }
}
