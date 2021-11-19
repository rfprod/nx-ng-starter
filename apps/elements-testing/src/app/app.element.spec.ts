import { AppElement } from './app.element';

jest.mock('./app.element.scss', jest.fn());

describe('AppElement', () => {
  let app: AppElement;

  beforeEach(() => {
    app = new AppElement();
  });

  it('should create successfully', () => {
    expect(app).toBeTruthy();
  });

  it('should have a greeting', () => {
    app.connectedCallback();

    expect(app.querySelector('h1')?.innerHTML).toEqual('elements-testing');
  });
});
