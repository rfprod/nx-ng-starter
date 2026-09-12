import { mkdtemp, rm } from 'fs/promises';
import { FsTree } from 'nx/src/generators/tree';
import { tmpdir } from 'os';
import type { MockInstance } from 'vitest';

import { findFiles } from './find-files.util';

describe('findFiles', () => {
  let tree: FsTree;
  let treeSpy: { children: MockInstance; isFile: MockInstance };

  let tmpDir: string;

  const createTempDir = async () => {
    return mkdtemp(tmpdir() + '/');
  };

  const removeTempDir = async (dirPath: string) => {
    return rm(dirPath, { recursive: true, force: true });
  };

  beforeEach(async () => {
    tmpDir = await createTempDir();
    tree = new FsTree(tmpDir, false);
    treeSpy = {
      children: vi.spyOn(tree, 'children'),
      isFile: vi.spyOn(tree, 'isFile'),
    };
  });

  afterEach(async () => {
    await removeTempDir(tmpDir);
  });

  it('should return an empty string if there are no .html files in the file system tree', () => {
    const pkgDir = 'tools';
    tree.write(`${pkgDir}/.gitkeep`, '');
    const files = findFiles(tree, pkgDir);
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toEqual(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .html files in the file system tree', () => {
    const pkgDir = 'pkg';
    tree.write(`${pkgDir}/test.html`, '<div>zxc</div>');
    const files = findFiles(tree, pkgDir);
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .json files in the file system tree', () => {
    const testFileContent = JSON.stringify({ z: 'x' });
    const pkgDir = `pkg`;
    tree.write(`${pkgDir}/test.json`, testFileContent);
    const files = findFiles(tree, pkgDir, '.json');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });
});
