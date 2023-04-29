jest.mock('@nx/devkit');
jest.mock('fs/promises');
jest.mock('dotenv');

import { ExecutorContext, logger } from '@nx/devkit';
import dotenv from 'dotenv';
import { Abortable } from 'events';
import { Mode, ObjectEncodingOptions, OpenMode, PathLike, StatOptions, Stats } from 'fs';
import * as fsPromises from 'fs/promises';
import { Stream } from 'stream';

import { AppClientEnvConfig } from './env-client';
import { IExecutorOptions, TSupportedApp } from './schema';

describe('AppClientEnvConfig', () => {
  const setup = (
    app: TSupportedApp = 'client',
    mockAccess?: boolean,
    mockReadFile?: boolean,
    mockStat?: boolean,
    mockwriteFile?: boolean,
  ) => {
    const accessMock = <jest.Mock>fsPromises.access;
    if (mockAccess === true) {
      accessMock.mockImplementation((path: PathLike, mode?: number) => new Promise<void>(resolve => resolve()));
    }

    const readFileMock = <jest.Mock>fsPromises.readFile;
    if (mockReadFile === true) {
      readFileMock.mockImplementation(
        (
          path: PathLike | fsPromises.FileHandle,
          opts?:
            | ({
                encoding?: null | undefined;
                flag?: OpenMode | undefined;
              } & Abortable)
            | null,
        ) => new Promise<string>(resolve => resolve('{}')),
      );
    }

    const statMock = <jest.Mock>fsPromises.stat;
    if (mockStat === true) {
      statMock.mockImplementation(
        (
          path: PathLike,
          opts?: StatOptions & {
            bigint?: false | undefined;
          },
        ) =>
          new Promise<Stats>(resolve =>
            resolve({
              dev: 2114,
              ino: 48064969,
              mode: 33188,
              nlink: 1,
              uid: 85,
              gid: 100,
              rdev: 0,
              size: 527,
              blksize: 4096,
              blocks: 8,
              atimeMs: 1318289051000.1,
              mtimeMs: 1318289051000.1,
              ctimeMs: 1318289051000.1,
              birthtimeMs: 1318289051000.1,
              atime: new Date(),
              mtime: new Date(),
              ctime: new Date(),
              birthtime: new Date(),
              isFile: () => false,
              isDirectory: () => false,
              isBlockDevice: () => false,
              isCharacterDevice: () => false,
              isSymbolicLink: () => false,
              isFIFO: () => false,
              isSocket: () => false,
            }),
          ),
      );
    }

    const writeFileMock = <jest.Mock>fsPromises.writeFile;
    if (mockwriteFile === true) {
      writeFileMock.mockImplementation(
        (
          file: PathLike | fsPromises.FileHandle,
          data:
            | string
            | NodeJS.ArrayBufferView
            | Iterable<string | NodeJS.ArrayBufferView>
            | AsyncIterable<string | NodeJS.ArrayBufferView>
            | Stream,
          opts?:
            | (ObjectEncodingOptions & {
                mode?: Mode | undefined;
                flag?: OpenMode | undefined;
              } & Abortable)
            | BufferEncoding
            | null,
        ) => new Promise<void>(resolve => resolve()),
      );
    }

    const context: ExecutorContext = {
      cwd: process.cwd(),
      isVerbose: false,
      root: '/root',
      workspace: {
        version: 1,
        projects: {},
      },
      configurationName: '',
      projectName: app,
      target: { executor: '' },
      targetName: '',
    };

    const options: IExecutorOptions = { app };

    return { context, options, accessMock, readFileMock, statMock, writeFileMock };
  };

  describe('errors', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if an application is not supported', async () => {
      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, writeFileMock } = setup();
      const executor = new AppClientEnvConfig(options, context);
      executor.supportedApps.shift(); // remove 'client' from the supported apps array to make it unsupported

      try {
        await executor.execute();
      } catch (e) {
        expect((<Error>e).message).toEqual(`The application is not supported.\nSupported apps: ${executor.supportedApps.join(' ')}`);
      }

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).not.toHaveBeenCalled();
      expect(accessMock).not.toHaveBeenCalled();
      expect(writeFileMock).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should throw an error if unable to read package.json file', async () => {
      const error = new Error('test error');

      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, writeFileMock } = setup();
      readFileMock.mockImplementation(
        (
          path: PathLike | fsPromises.FileHandle,
          opts?:
            | ({
                encoding?: null | undefined;
                flag?: OpenMode | undefined;
              } & Abortable)
            | null,
        ) => new Promise<string>((resolve, reject) => reject(error)),
      );
      const executor = new AppClientEnvConfig(options, context);

      try {
        await executor.execute();
      } catch (e) {
        expect((<Error>e).message).toEqual(error.message);
      }

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(accessMock).not.toHaveBeenCalled();
      expect(writeFileMock).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should throw an error if unable to access environment config file', async () => {
      const error = new Error('test error');
      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, writeFileMock } = setup('client', false, true);
      accessMock.mockImplementation((path: PathLike, mode?: number) => new Promise<void>((resolve, reject) => reject(error)));
      const executor = new AppClientEnvConfig(options, context);

      try {
        await executor.execute();
      } catch (e) {
        expect((<Error>e).message).toEqual(`Unable to write the environment configuration file:\n${error.message}`);
      }

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(accessMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should throw an error if unable to stat env file path', async () => {
      const error = new Error('test error');
      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, statMock, writeFileMock } = setup('client', true, true);
      statMock.mockImplementation(
        (
          path: PathLike,
          opts?: StatOptions & {
            bigint?: false | undefined;
          },
        ) => new Promise<void>((resolve, reject) => reject(error)),
      );
      const executor = new AppClientEnvConfig(options, context);

      try {
        await executor.execute();
      } catch (e) {
        expect((<Error>e).message).toEqual(`Unable to stat environment file:\n${error.message}`);
      }

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(accessMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should throw an error if unable to write env file', async () => {
      const error = new Error('test error');
      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, statMock, writeFileMock } = setup('client', true, true, true);
      writeFileMock.mockImplementation(
        (
          file: PathLike | fsPromises.FileHandle,
          data:
            | string
            | NodeJS.ArrayBufferView
            | Iterable<string | NodeJS.ArrayBufferView>
            | AsyncIterable<string | NodeJS.ArrayBufferView>
            | Stream,
          opts?:
            | (ObjectEncodingOptions & {
                mode?: Mode | undefined;
                flag?: OpenMode | undefined;
              } & Abortable)
            | BufferEncoding
            | null,
        ) => new Promise<void>((resolve, reject) => reject(error)),
      );
      const executor = new AppClientEnvConfig(options, context);

      try {
        await executor.execute();
      } catch (e) {
        expect((<Error>e).message).toEqual(`Unable to write environment file:\n${error.message}`);
      }

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(accessMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).toHaveBeenCalledTimes(1);
      expect(logger.info).not.toHaveBeenCalled();
    });
  });

  describe('correct behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('should call logger.info if everything went as expected when setting environment variables', async () => {
      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, statMock, writeFileMock } = setup('client', true, true, true, true);
      const executor = new AppClientEnvConfig(options, context);

      await executor.execute();

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(accessMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).toHaveBeenCalledTimes(1);
      const loggerCalls = 2;
      expect(logger.info).toHaveBeenCalledTimes(loggerCalls);
      expect(logger.info).toHaveBeenNthCalledWith(1, 'Output generated at:');
      expect(logger.info).toHaveBeenNthCalledWith(loggerCalls, expect.any(String));
    });

    it('should not call readFile and call logger.info if everything went as expected when resetting environment variables', async () => {
      const dotenvSpy = jest.spyOn(dotenv, 'config');

      const { context, options, accessMock, readFileMock, statMock, writeFileMock } = setup('client', true, true, true, true);
      options.reset = true;
      const executor = new AppClientEnvConfig(options, context);

      await executor.execute();

      expect(dotenvSpy).toHaveBeenCalledTimes(1);
      expect(readFileMock).not.toHaveBeenCalled();
      expect(accessMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).toHaveBeenCalledTimes(1);
      const loggerCalls = 2;
      expect(logger.info).toHaveBeenCalledTimes(loggerCalls);
      expect(logger.info).toHaveBeenNthCalledWith(1, 'Output generated at:');
      expect(logger.info).toHaveBeenNthCalledWith(loggerCalls, expect.any(String));
    });
  });
});
