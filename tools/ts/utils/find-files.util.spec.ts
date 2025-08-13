import { FsTree } from 'nx/src/generators/tree';
import { createDirectory } from 'nx/src/utils/fileutils';
import type { MockInstance } from 'vitest';

import { findFiles } from './find-files.util';

describe('findFiles', () => {
  const root = process.cwd();
  let tree: FsTree;
  let treeSpy: {
    children: MockInstance;
    isFile: MockInstance;
  };

  beforeEach(() => {
    tree = new FsTree(root, false);
    treeSpy = {
      children: vi.spyOn(tree, 'children'),
      isFile: vi.spyOn(tree, 'isFile'),
    };
  });

  it('should return an empty string if there are no .html files in the file system tree', () => {
    const files = findFiles(tree, 'tools');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toEqual(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .html files in the file system tree', () => {
    const testFilePath = './test.html';
    const testFileContent = '<div>zxc</div>';
    const pkgDir = `${tree.root}/pkg`;
    createDirectory(pkgDir);
    tree.write(`${pkgDir}/${testFilePath}`, testFileContent);
    const files = findFiles(tree, pkgDir);
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .json files in the file system tree', () => {
    const testFilePath = './test.json';
    const testFileContent = JSON.stringify({ z: 'x' });
    const pkgDir = `${tree.root}/pkg`;
    createDirectory(pkgDir);
    tree.write(`${pkgDir}/${testFilePath}`, testFileContent);
    const files = findFiles(tree, pkgDir, '.json');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });
});
