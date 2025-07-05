import * as fs from 'fs';
import type { MockInstance } from 'vitest';

import { findFiles } from './find-files.util';

vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
}));

describe('findFiles', () => {
  let existsSyncSpy: MockInstance;
  let readdirSyncSpy: MockInstance;

  beforeEach(() => {
    existsSyncSpy = vi.spyOn(fs, 'existsSync');
    readdirSyncSpy = vi.spyOn(fs, 'readdirSync');
  });

  it('should return stderr if the source directory does not exist', () => {
    existsSyncSpy.mockImplementation(() => false);
    readdirSyncSpy.mockImplementation(() => []);
    const files = findFiles('.test');
    expect(files.stderr.length).toBeGreaterThan(0);
    expect(files.stdout.length).toEqual(0);
    expect(existsSyncSpy).toHaveBeenCalled();
    expect(readdirSyncSpy).not.toHaveBeenCalled();
  });

  it('should return an empty string if there are no .js files in the file system tree', () => {
    existsSyncSpy.mockImplementation(() => true);
    readdirSyncSpy.mockImplementation(() => []);
    const files = findFiles('.test');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toEqual(0);
    expect(existsSyncSpy).toHaveBeenCalled();
    expect(readdirSyncSpy).toHaveBeenCalled();
  });

  it('should find .js files in a file system tree', () => {
    existsSyncSpy.mockImplementation(() => true);
    readdirSyncSpy.mockImplementation(() => ['test.js']);
    const files = findFiles('.test');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(existsSyncSpy).toHaveBeenCalled();
    expect(readdirSyncSpy).toHaveBeenCalled();
  });
});
