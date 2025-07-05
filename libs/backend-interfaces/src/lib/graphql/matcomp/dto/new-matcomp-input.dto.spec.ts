import { validate } from 'class-validator';

import { AppMatcompInputDto, maxInputLength } from './new-matcomp-input.dto';

describe('AppMatcompInputDto', () => {
  it('should validate correctly with valid input', async () => {
    const input = new AppMatcompInputDto();
    input.name = 'Valid Name';
    input.description = 'This is a valid description.';

    const errors = await validate(input);
    expect(errors).toHaveLength(0); // No validation errors should be present
  });

  it('should fail validation if name is too short', async () => {
    const input = new AppMatcompInputDto();
    input.name = 'ab';
    input.description = 'This is a valid description.';

    const errors = await validate(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('name');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail validation if name is too long', async () => {
    const input = new AppMatcompInputDto();
    input.name = 'a'.repeat(maxInputLength + 1);
    input.description = 'This is a valid description.';

    const errors = await validate(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('name');
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });

  it('should fail validation if description is too short', async () => {
    const input = new AppMatcompInputDto();
    input.name = 'Valid Name';
    input.description = 'ab';

    const errors = await validate(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('description');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail validation if description is too long', async () => {
    const input = new AppMatcompInputDto();
    input.name = 'Valid Name';
    input.description = 'a'.repeat(maxInputLength + 1);

    const errors = await validate(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('description');
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });
});
