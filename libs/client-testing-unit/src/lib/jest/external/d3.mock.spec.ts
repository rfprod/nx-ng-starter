import * as d3 from 'd3';

describe('setupD3JsMock', () => {
  describe('document.getElementById finds nothing', () => {
    it('should set up expected d3 mock: scaleOrdinal', () => {
      expect(d3.scaleOrdinal('range')('test')).toEqual('test');
    });

    it('should set up expected d3 mock: max', () => {
      expect(d3.max([-1, 0, 1])).toEqual(1);
    });

    it('should set up expected d3 mock: scaleLinear', () => {
      expect(d3.scaleLinear([0, 1]).domain).toBeDefined();
      expect(d3.scaleLinear([0, 1]).domain()).toEqual(0);
    });

    it('should set up expected d3 mock: range', () => {
      expect(d3.range(0, 1)).toEqual([0, 1]);
      expect(d3.lineRadial).toBeDefined();
    });

    it('should set up expected d3 mock: lineRadial', () => {
      expect(d3.lineRadial).toBeDefined();
      const lineRadial = d3.lineRadial();
      expect(lineRadial.angle).toBeDefined();
      expect(lineRadial.radius).toBeDefined();
      expect(lineRadial.angle()).toEqual(0);
      expect(lineRadial.radius()).toEqual(0);
    });

    it('should set up expected d3 mock: select', () => {
      expect(d3.select).toBeDefined();
      const select = d3.select('x');
      expect(select.remove).toBeDefined();
      expect(select.remove()).toBeNull();
      expect(select.selectAll).toBeDefined();
      expect(select.selectAll('x')).toEqual(expect.any(Object));
      expect(select.select('x')).toEqual(expect.any(Object));
      expect(select.append('x')).toEqual(expect.any(Object));
      expect(select.attr('x', 'x')).toEqual(expect.any(Object));
      expect(select.style('x', 'x')).toEqual(expect.any(Object));
      expect(select.data([0])).toEqual(expect.any(Object));
      expect(select.enter()).toEqual(expect.any(Object));
      expect(select.text()).toEqual(expect.any(Object));
      expect(select.call(() => void 0)).toBeUndefined();
      expect(select.on('x')).toEqual(expect.any(Object));
    });
  });

  describe('document.getElementById finds an element', () => {
    let docSpy: jest.SpyInstance;

    beforeEach(() => {
      docSpy = jest.spyOn(document, 'getElementById');
      const el = document.createElement('div');
      docSpy.mockReturnValue(el);
    });

    afterAll(() => {
      docSpy.mockReset();
    });

    it('should set up expected d3 mock: scaleOrdinal', () => {
      expect(d3.scaleOrdinal('range')('test')).toEqual('test');
    });

    it('should set up expected d3 mock: max', () => {
      expect(d3.max([-1, 0, 1])).toEqual(1);
    });

    it('should set up expected d3 mock: scaleLinear', () => {
      expect(d3.scaleLinear([0, 1]).domain).toBeDefined();
      expect(d3.scaleLinear([0, 1]).domain()).toEqual(0);
    });

    it('should set up expected d3 mock: range', () => {
      expect(d3.range(0, 1)).toEqual([0, 1]);
      expect(d3.lineRadial).toBeDefined();
    });

    it('should set up expected d3 mock: lineRadial', () => {
      expect(d3.lineRadial).toBeDefined();
      const lineRadial = d3.lineRadial();
      expect(lineRadial.angle).toBeDefined();
      expect(lineRadial.radius).toBeDefined();
      expect(lineRadial.angle()).toEqual(0);
      expect(lineRadial.radius()).toEqual(0);
    });

    it('should set up expected d3 mock: select', () => {
      expect(d3.select).toBeDefined();
      const select = d3.select('x');
      expect(select.remove).toBeDefined();
      expect(select.remove()).toBeNull();
      expect(select.selectAll).toBeDefined();
      expect(select.selectAll('x')).toEqual(expect.any(Object));
      expect(select.select('x')).toEqual(expect.any(Object));
      expect(select.append('x')).toEqual(expect.any(Object));
      expect(select.attr('x', 'x')).toEqual(expect.any(Object));
      expect(select.style('x', 'x')).toEqual(expect.any(Object));
      expect(select.data([0])).toEqual(expect.any(Object));
      expect(select.enter()).toEqual(expect.any(Object));
      expect(select.text()).toEqual(expect.any(Object));
      expect(select.call(() => void 0)).toBeUndefined();
      expect(select.on('x')).toEqual(expect.any(Object));
    });
  });
});
