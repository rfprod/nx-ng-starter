import { initializeClassProperties } from './class.util';

describe('initializeClassProperties', () => {
  class AppTestModel {
    public firstProp: string | undefined = '';

    public lastProp: string | null = '';
  }

  it('should initialize class properties as expected', () => {
    const model = new AppTestModel();
    expect(model.firstProp).toEqual('');
    expect(model.lastProp).toEqual('');

    initializeClassProperties(model, void 0);
    expect(model.firstProp).toEqual('');
    expect(model.lastProp).toEqual('');

    const firstInitializer: AppTestModel = {
      firstProp: 'test',
      lastProp: 'test',
    };
    initializeClassProperties(model, firstInitializer);
    expect(model.firstProp).toEqual(firstInitializer.firstProp);
    expect(model.lastProp).toEqual(firstInitializer.lastProp);

    const secondInitializer: AppTestModel = {
      firstProp: void 0,
      lastProp: null,
    };
    initializeClassProperties(model, secondInitializer);
    expect(model.firstProp).toEqual(firstInitializer.firstProp);
    expect(model.lastProp).toEqual(firstInitializer.lastProp);
  });
});
