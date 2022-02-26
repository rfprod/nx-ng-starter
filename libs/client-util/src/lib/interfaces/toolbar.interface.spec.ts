import { toolbarAnchor, toolbarButton } from './toolbar.interface';

describe('toolbar.interface', () => {
  it('toolbarButton should return an object with expected properties', () => {
    const title = 'test';
    const button = toolbarButton(title);
    expect(button.title).toEqual(title);
    expect(toolbarButton().title).toEqual('');
    expect(button.routeActive()).toEqual(false);
  });

  it('toolbarAnchor should return an object with expected properties', () => {
    const title = 'test';
    const anchor = toolbarAnchor(title);
    expect(anchor.title).toEqual(title);
    expect(toolbarAnchor().title).toEqual('');
  });
});
