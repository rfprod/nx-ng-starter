import { validate } from 'class-validator';

import { AppMatcompArgs } from './matcomp.args';

describe('AppMatcompArgs', () => {
  it('should validate correctly with default values', async () => {
    const args = new AppMatcompArgs();
    const errors = await validate(args);
    expect(errors).toHaveLength(0);
  });

  it('should validate correctly with custom valid values', async () => {
    const args = new AppMatcompArgs();
    args.skip = 5;
    args.take = 25;

    const errors = await validate(args);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation if skip is less than defaultSkipValue', async () => {
    const args = new AppMatcompArgs();
    args.skip = -1;

    const errors = await validate(args);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('skip');
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation if take is less than minTakeValue', async () => {
    const args = new AppMatcompArgs();
    args.take = 0;

    const errors = await validate(args);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('take');
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation if take is greater than maxTakeValue', async () => {
    const args = new AppMatcompArgs();
    args.take = 51;

    const errors = await validate(args);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('take');
    expect(errors[0].constraints).toHaveProperty('max');
  });
});
