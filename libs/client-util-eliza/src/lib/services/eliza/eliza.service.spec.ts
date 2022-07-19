import { TestBed, waitForAsync } from '@angular/core/testing';
import { concatMap, first, from, switchMap, tap } from 'rxjs';

import { elizaData, elizaDataProvider } from '../../config/data.config';
import { elizaInitialConfig } from '../../config/eliza.config';
import { elizaFinalDefault, elizaFinals } from '../../config/finals.config';
import { elizaInitialDefault, elizaInitials } from '../../config/initials.config';
import { IChatMessage } from '../../interfaces/chat.interface';
import { IElizaConfig, IElizaData } from '../../interfaces/eliza.interface';
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

    it('should use correct initial message', waitForAsync(() => {
      void service.messages$
        .pipe(
          first(),
          tap(messages => {
            expect(messages.length).toEqual(1);
            expect(messages[0].bot).toBeTruthy();
            expect(elizaInitials.includes(messages[0].text)).toBeTruthy();
          }),
        )
        .subscribe();
    }));

    it('should use correct final message', async () => {
      const response = await service.getResponse('bye');
      expect(response.final).toBeTruthy();
      expect(elizaFinals.includes(response.reply)).toBeTruthy();
    });

    it('nextMessage should push a message to the messages stack', waitForAsync(() => {
      const nextMessage: IChatMessage = { bot: false, text: 'next' };
      void service.messages$
        .pipe(
          first(),
          switchMap(messages => {
            expect(messages.length).toEqual(1);
            service.nextMessage(nextMessage);
            return service.messages$.pipe(first());
          }),
          tap(messages => {
            const expectedLength = 2;
            expect(messages.length).toEqual(expectedLength);
            expect(messages[messages.length - 1]).toEqual(nextMessage);
          }),
        )
        .subscribe();
    }));

    it('nextConfig should update the Eliza config', waitForAsync(() => {
      const nextConfig: IElizaConfig = { ...elizaInitialConfig, debug: true };
      void service.config$
        .pipe(
          first(),
          switchMap(config => {
            expect(config).toEqual(elizaInitialConfig);
            service.nextConfig(nextConfig);
            return service.config$.pipe(first());
          }),
          tap(config => {
            expect(config).toEqual(nextConfig);
          }),
        )
        .subscribe();
    }));
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
        expect((<Error>e).message).toEqual(noKeywordsError.message);
      }
    });

    it('setup should throw an error if Eliza data does not have any configured pre expressions', () => {
      try {
        service.setup({ ...elizaData, pres: [] });
      } catch (e) {
        expect((<Error>e).message).toEqual(noPresError.message);
      }
    });

    it('setup should throw an error if Eliza data does not have any configured post expressions', () => {
      try {
        service.setup({ ...elizaData, posts: [] });
      } catch (e) {
        expect((<Error>e).message).toEqual(noPostsError.message);
      }
    });

    it('reset should throw an error if Eliza has not been initialized yet', () => {
      try {
        service.reset();
      } catch (e) {
        expect((<Error>e).message).toEqual(notInitializedError.message);
      }
    });

    it('getResponse should throw an error if Eliza has not been initialized yet', async () => {
      try {
        await service.getResponse('');
      } catch (e) {
        expect((<Error>e).message).toEqual(notInitializedError.message);
      }
    });
  });

  describe('default initial message and default final message', () => {
    beforeEach(async () => {
      await setup({ ...elizaData, initials: [], finals: [] });
    });

    it('should use the default initial message and default final message if initials and finals are not configured', waitForAsync(() => {
      void service.messages$
        .pipe(
          first(),
          tap(messages => {
            expect(messages[0].text).toEqual(elizaInitialDefault);
          }),
          concatMap(() => from(service.getResponse('Bye'))),
          tap(response => {
            expect(response.reply).toEqual(elizaFinalDefault);
          }),
        )
        .subscribe();
    }));
  });
});
