/**
 * d3js select method mock.
 * @param id element id
 * @returns selected element
 */
const select = (id: string) => {
  const el = document.getElementById(id);
  return {
    ...el,
    remove: () => null,
    selectAll: (id0: string) => select(id0),
    select: (id1: string) => select(id1),
    append: (tag: string) => {
      const child = document.createElement(tag);
      el?.appendChild(child);
      return select(id);
    },
    attr: (name: string, value: string) => {
      el?.setAttribute(name, value);
      return select(id);
    },
    style: (name: string, value: string) => {
      const style = el?.style;
      if (typeof style !== 'undefined') {
        style[name] = value;
      }
      return select(id);
    },
    data: (range: number[]) => select(id),
    enter: () => select(id),
    text: (callback: (data: number, index: number) => number) => select(id),
    call: (fn: (svgText: unknown, width: number) => undefined, wrapWidth: number) => void 0,
    on: (event: string, callback: unknown) => select(id),
  };
};

/**
 * d3js lineRadial method mock.
 * @param fn function
 * @returns object
 */
const lineRadial = (fn: unknown) => ({
  angle: (fn0: unknown) => 0,
  radius: (fn1: unknown) => 0,
});

/**
 * d3js scaleOrdinal method mock.
 * @param range input data
 * @returns
 */
const scaleOrdinal = (range: string) => (original: string) => original;

/**
 * d3js scaleLinear method mock.
 * @param num input data
 * @returns
 */
const scaleLinear = (num: [number, number]) => ({ domain: (dnum: [number, number]) => 0 });

/**
 * d3js max method mock.
 * @param data input data
 * @returns max value
 */
const max = (data: number[]) => Math.max(...data);

/**
 * d3js range method mock.
 * @param args input data
 * @returns range
 */
const range = (...args: number[]) => [...args];

/**
 * d3js mock value.
 */
export const d3MockValue = {
  scaleOrdinal,
  max,
  scaleLinear,
  select,
  range,
  lineRadial,
};
