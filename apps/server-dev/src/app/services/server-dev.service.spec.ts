import { Test } from '@nestjs/testing';
import { ChildProcess } from 'child_process';

import { AppServerDevService } from './server-dev.service';

describe('AppServerDevService', () => {
  let service: AppServerDevService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppServerDevService],
    }).compile();

    service = app.get<AppServerDevService>(AppServerDevService);
  });

  describe('resetEnvironments', () => {
    it('should invoke the child process spawn command', () => {
      const spy = jest.spyOn(service, 'spawn');
      const child = new ChildProcess();
      spy.mockImplementation(() => child);
      service.resetEnvironments();
      child.emit('close');
      expect(spy).toHaveBeenCalledWith('npx', ['nx', 'run-many', '--target', 'configure-env', '--all', '--reset'], {
        stdio: 'inherit',
        detached: true,
      });
    });

    it('should invoke the child process spawn command, error code 8', () => {
      const spy = jest.spyOn(service, 'spawn');
      const child = new ChildProcess();
      spy.mockImplementation(() => child);
      service.resetEnvironments();
      const code = 8;
      child.emit('close', code);
      expect(spy).toHaveBeenCalledWith('npx', ['nx', 'run-many', '--target', 'configure-env', '--all', '--reset'], {
        stdio: 'inherit',
        detached: true,
      });
    });
  });
});
