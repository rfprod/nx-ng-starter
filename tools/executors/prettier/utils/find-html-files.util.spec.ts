import { FsTree } from 'nx/src/generators/tree';

import { findFiles } from './find-html-files.util';

describe('findFiles', () => {
  const root = process.cwd();
  let tree: FsTree;
  let treeSpy: {
    children: jest.SpyInstance;
    isFile: jest.SpyInstance;
  };

  beforeEach(() => {
    tree = new FsTree(root, false);
    treeSpy = {
      children: jest.spyOn(tree, 'children'),
      isFile: jest.spyOn(tree, 'isFile'),
    };
  });

  it('should return an empty string if there are no .html files in the file system tree', () => {
    const files = findFiles(tree, 'tools');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toEqual(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .html files in a file system tree', () => {
    const testHtmlFilePath = './test.html';
    const testHtmlFileContent = '<div>test</div>';
    tree.write(testHtmlFilePath, testHtmlFileContent);
    const files = findFiles(tree, 'apps');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .json files in a file system tree', () => {
    const testHtmlFilePath = './test.json';
    const testHtmlFileContent = JSON.stringify({ a: 'b' });
    tree.write(testHtmlFilePath, testHtmlFileContent);
    const files = findFiles(tree, 'apps', '.json');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });
});
