import { AppMatcomp, AppMatcompArgs, AppMatcompInputDto, AppMatcompSubscription } from '@app/backend-interfaces';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PubSub } from 'graphql-subscriptions';

import { AppMatcompService, MATCOMP_SERVICE_TOKEN } from '../services/matcomp.service';
import { AppMatcompResolver } from './matcomp.resolver';

describe('AppMatcompResolver', () => {
  let testingModule: TestingModule;
  let resolver: AppMatcompResolver;
  let service: AppMatcompService;
  let pubSub: PubSub;

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        AppMatcompService,
        {
          provide: MATCOMP_SERVICE_TOKEN,
          useExisting: AppMatcompService,
        },
        AppMatcompResolver,
        {
          provide: 'PUB_SUB',
          useFactory: () => new PubSub(),
        },
      ],
    })
      .compile()
      .then(module => {
        testingModule = module;
        resolver = testingModule.get<AppMatcompResolver>(AppMatcompResolver);
        service = testingModule.get<AppMatcompService>(AppMatcompService);
        pubSub = testingModule.get<PubSub>('PUB_SUB');
      });
  });

  it('matcomps should call service.findAll with args', async () => {
    const spy = jest.spyOn(service, 'findAll');
    const args = new AppMatcompArgs();
    await resolver.matcomps(args);
    expect(spy).toHaveBeenCalledWith(args);
  });

  describe('matcomp', () => {
    it(' should call service.findOneById with arg and throw an exception if an item was not found', async () => {
      const spy = jest.spyOn(service, 'findOneById');
      const id = '0';
      try {
        await resolver.matcomp(id);
      } catch (e) {
        expect(e instanceof NotFoundException).toBeTruthy();
      }
      expect(spy).toHaveBeenCalledWith(id);
    });

    it(' should call service.findOneById with arg and return an item if it exists', async () => {
      const matcomp = new AppMatcomp();
      const spy = jest.spyOn(service, 'findOneById');
      spy.mockReturnValue(matcomp);
      const id = '0';
      const result = await resolver.matcomp(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(result).toEqual(matcomp);
    });
  });

  it('create should call service.create with args, call pubSub.publish, and return the created item', async () => {
    const dto = new AppMatcompInputDto();
    const expectedItem = new AppMatcomp({ ...dto, id: '0' });
    const expectedSubscription: AppMatcompSubscription = new AppMatcompSubscription({ matcomp: expectedItem });
    const pubSubSpy = jest.spyOn(pubSub, 'publish');
    const serviceSpy = jest.spyOn(service, 'create');
    serviceSpy.mockReturnValue(expectedItem);
    const result = await resolver.create(dto);
    expect(result).toEqual(expectedItem);
    expect(serviceSpy).toHaveBeenCalledWith(dto);
    expect(pubSubSpy).toHaveBeenCalledWith('matcompCreated', expectedSubscription);
  });

  it('matcompCreated should call pubSub.asyncIterator with args', () => {
    const pubSubSpy = jest.spyOn(pubSub, 'asyncIterator');
    resolver.matcompCreated();
    expect(pubSubSpy).toHaveBeenCalledWith('matcompCreated');
  });

  describe('remove', () => {
    it('remove should call service.remove with args, call pubSub.publish, and return the removed item', async () => {
      const pubSubSpy = jest.spyOn(pubSub, 'publish');
      const serviceSpy = jest.spyOn(service, 'remove');
      const expectedItem = void 0;
      const expectedSubscription: AppMatcompSubscription = new AppMatcompSubscription(expectedItem);
      const id = '0';
      const result = await resolver.remove(id);
      expect(result).toEqual(expectedItem);
      expect(serviceSpy).toHaveBeenCalledWith(id);
      expect(pubSubSpy).toHaveBeenCalledWith('matcompRemoved', expectedSubscription);
    });

    it('remove should call service.remove with args, call pubSub.publish, and return the removed item', async () => {
      const dto = new AppMatcompInputDto();
      const expectedItem = new AppMatcomp({ ...dto, id: '0' });
      const expectedSubscription: AppMatcompSubscription = new AppMatcompSubscription({ matcomp: expectedItem });
      await resolver.create(dto);
      const pubSubSpy = jest.spyOn(pubSub, 'publish');
      const serviceSpy = jest.spyOn(service, 'remove');
      serviceSpy.mockReturnValue(expectedItem);
      const result = await resolver.remove(expectedItem.id);
      expect(result).toEqual(expectedItem);
      expect(serviceSpy).toHaveBeenCalledWith(expectedItem.id);
      expect(pubSubSpy).toHaveBeenCalledWith('matcompRemoved', expectedSubscription);
    });
  });

  it('matcompRemoved should call pubSub.asyncIterator with args', () => {
    const pubSubSpy = jest.spyOn(pubSub, 'asyncIterator');
    resolver.matcompRemoved();
    expect(pubSubSpy).toHaveBeenCalledWith('matcompRemoved');
  });
});
