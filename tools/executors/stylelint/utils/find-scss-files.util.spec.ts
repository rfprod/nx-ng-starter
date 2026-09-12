import { mkdtemp, rm } from 'fs/promises';
import { FsTree } from 'nx/src/generators/tree';
import { tmpdir } from 'os';
import { describe, expect, it, type MockInstance, vi } from 'vitest';

import { findScssFiles } from './find-scss-files.util';

describe('findScssFiles', () => {
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

  it('should return an empty string if there are no .scss files in the file system tree', () => {
    tree.write(`tools/.gitkeep`, '');
    const files = findScssFiles(tree, 'tools');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toEqual(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .scss files in a file system tree', () => {
    tree.write(`apps/test.scss`, '.div { width: 100% }');
    const files = findScssFiles(tree, 'apps');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });
});
