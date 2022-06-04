import { AppMatcomp, AppMatcompArgs, AppMatcompInput } from '@app/backend-interfaces';
import { Test, TestingModule } from '@nestjs/testing';

import { AppMatcompService } from './matcomp.service';

describe('AppMatcompService', () => {
  let testingModule: TestingModule;
  let service: AppMatcompService;

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [AppMatcompService],
    })
      .compile()
      .then(module => {
        testingModule = module;
        service = testingModule.get<AppMatcompService>(AppMatcompService);
      });
  });

  describe('findAll method', () => {
    it('should return all existing items if any', () => {
      const args = new AppMatcompArgs();
      expect(service.findAll(args)).toEqual([]);
      const input = new AppMatcompInput();
      service.create(input);
      expect(service.findAll(args).length).toEqual(1);
    });

    it('should respect args input', () => {
      const args = new AppMatcompArgs();
      expect(service.findAll(args)).toEqual([]);
      const input = new AppMatcompInput();
      service.create(input);
      service.create(input);
      const expectedLegth = 2;
      expect(service.findAll(args).length).toEqual(expectedLegth);
      args.skip = 1;
      args.take = 1;
      expect(service.findAll(args).length).toEqual(0);
      args.take = 2;
      expect(service.findAll(args).length).toEqual(1);
    });
  });

  describe('findOneById method', () => {
    it('should return undefined if the is no item with the defined id', () => {
      expect(service.findOneById('0')).toEqual(void 0);
    });

    it('should return one item by id', () => {
      const input = new AppMatcompInput();
      const expected = new AppMatcomp({ ...input, id: '0' });
      expect(service.create(input)).toEqual(expected);
      expect(service.findOneById('0')).toEqual(expected);
    });
  });

  it('create method should create a new item, assign a currect id, add the value to the item array and return the created item', () => {
    const input = new AppMatcompInput();
    const expected = new AppMatcomp({ ...input, id: '0' });
    const created = service.create(input);
    expect(created.id).toEqual(expected.id);
    expect(created.description).toEqual(expected.description);
    expect(created.name).toEqual(expected.name);
    expect(created.creationDate).toBeCloseTo(expected.creationDate);
  });

  it('remove method should remove an item from the items array and return the removed item', () => {
    const input = new AppMatcompInput();
    const expected = new AppMatcomp({ ...input, id: '0' });
    service.create(input);
    expect(service.remove(expected.id)).toEqual(expected);
  });
});
