import { mkdtemp, rm } from 'fs/promises';
import { FsTree } from 'nx/src/generators/tree';
import { tmpdir } from 'os';
import { describe, expect, it, type MockInstance, vi } from 'vitest';

import { findFiles } from './find-html-files.util';

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

  it('should find .html files in a file system tree', () => {
    const pkgDir = 'apps';
    tree.write(`${pkgDir}/test.html`, '<div>test</div>');
    const files = findFiles(tree, pkgDir);
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .json files in a file system tree', () => {
    const pkgDir = 'apps';
    const testHtmlFileContent = JSON.stringify({ a: 'b' });
    tree.write(`${pkgDir}/test.json`, testHtmlFileContent);
    const files = findFiles(tree, pkgDir, '.json');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });
});
