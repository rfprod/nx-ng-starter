import { TestBed } from '@angular/core/testing';

import { elizaData, elizaDataProvider } from '../../config/data.config';
import { elizaInitialConfig } from '../../config/eliza.config';
import { elizaFinalDefault, elizaFinals } from '../../config/finals.config';
import { elizaInitialDefault, elizaInitials } from '../../config/initials.config';
import type { IChatMessage } from '../../interfaces/chat.interface';
import type { IElizaConfig, IElizaData } from '../../interfaces/eliza.interface';
import { AppElizaService } from './eliza.service';

describe('AppElizaService', () => {
  let service: AppElizaService;

  const setup = async (data: IElizaData = elizaData) => {
    await TestBed.configureTestingModule({
      providers: [elizaDataProvider(data)],
    }).compileComponents();

    service = TestBed.inject(AppElizaService);
  };

  describe('basic features', () => {
    beforeEach(async () => {
      await setup();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should use correct initial message', () => {
      const messages = service.messages$();
      expect(messages.length).toEqual(1);
      expect(messages[0].bot).toBeTruthy();
      expect(elizaInitials.includes(messages[0].text)).toBeTruthy();
    });

    it('should use correct final message', async () => {
      const response = await service.getResponse('bye');
      expect(response.final).toBeTruthy();
      expect(elizaFinals.includes(response.reply)).toBeTruthy();
    });

    it('nextMessage should push a message to the messages stack', () => {
      const nextMessage: IChatMessage = { bot: false, text: 'next' };
      let messages = service.messages$();
      expect(messages.length).toEqual(1);
      service.nextMessage(nextMessage);
      messages = service.messages$();
      const expectedLength = 2;
      expect(messages.length).toEqual(expectedLength);
      expect(messages[messages.length - 1]).toEqual(nextMessage);
    });

    it('nextConfig should update the Eliza config', () => {
      const nextConfig: IElizaConfig = { ...elizaInitialConfig, debug: true };
      let config = service.config$();
      expect(config).toEqual(elizaInitialConfig);
      service.nextConfig(nextConfig);
      config = service.config$();
      expect(config).toEqual(nextConfig);
    });
  });

  describe('errors', () => {
    const notInitializedError = new Error('Initialize Eliza first.');
    const noKeywordsError = new Error('Eliza does not have any configured keywords.');
    const noPresError = new Error('Eliza does not have any configured pre expressions.');
    const noPostsError = new Error('Eliza does not have any configured post expressions.');

    beforeEach(async () => {
      await setup();

      service['data'] = void 0;
    });

    it('setup should throw an error if Eliza data does not have any configured keywords', () => {
      try {
        service.setup({ ...elizaData, keywords: [] });
      } catch (e) {
        expect((e as Error).message).toEqual(noKeywordsError.message);
      }
    });

    it('setup should throw an error if Eliza data does not have any configured pre expressions', () => {
      try {
        service.setup({ ...elizaData, pres: [] });
      } catch (e) {
        expect((e as Error).message).toEqual(noPresError.message);
      }
    });

    it('setup should throw an error if Eliza data does not have any configured post expressions', () => {
      try {
        service.setup({ ...elizaData, posts: [] });
      } catch (e) {
        expect((e as Error).message).toEqual(noPostsError.message);
      }
    });

    it('reset should throw an error if Eliza has not been initialized yet', () => {
      try {
        service.reset();
      } catch (e) {
        expect((e as Error).message).toEqual(notInitializedError.message);
      }
    });

    it('getResponse should throw an error if Eliza has not been initialized yet', async () => {
      try {
        await service.getResponse('');
      } catch (e) {
        expect((e as Error).message).toEqual(notInitializedError.message);
      }
    });
  });

  describe('default initial message and default final message', () => {
    beforeEach(async () => {
      await setup({ ...elizaData, initials: [], finals: [] });
    });

    it('should use the default initial message and default final message if initials and finals are not configured', async () => {
      const messages = service.messages$();
      expect(messages[0].text).toEqual(elizaInitialDefault);
      const response = await service.getResponse('Bye');
      expect(response.reply).toEqual(elizaFinalDefault);
    });
  });
});
