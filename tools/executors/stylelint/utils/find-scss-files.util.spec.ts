import { FsTree } from 'nx/src/generators/tree';

import { findScssFiles } from './find-scss-files.util';

describe('findScssFiles', () => {
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

  it('should return an empty string if there are no .scss files in the file system tree', () => {
    const files = findScssFiles(tree, 'tools');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toEqual(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });

  it('should find .scss files in a file system tree', () => {
    const testHtmlFilePath = './test.scss';
    const testHtmlFileContent = '.div { width: 100% }';
    tree.write(testHtmlFilePath, testHtmlFileContent);
    const files = findScssFiles(tree, 'apps');
    expect(files.stderr.length).toEqual(0);
    expect(files.stdout.length).toBeGreaterThan(0);
    expect(treeSpy.children).toHaveBeenCalled();
    expect(treeSpy.isFile).toHaveBeenCalled();
  });
});
