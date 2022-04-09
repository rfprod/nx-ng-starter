import { AppElementsTesting } from './elements-testing';

jest.mock('./elements-testing.scss', jest.fn());

describe('AppElementsTesting', () => {
  let app: AppElementsTesting;

  beforeEach(() => {
    app = new AppElementsTesting();
  });

  it('should create successfully', () => {
    expect(app).toBeTruthy();
  });

  it('should have a greeting', () => {
    app.connectedCallback();

    expect(app.querySelector('h1')?.innerHTML).toEqual('elements-testing');
  });
});
