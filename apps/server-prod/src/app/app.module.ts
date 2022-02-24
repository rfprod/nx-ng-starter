import { HttpModule } from '@nestjs/axios';
import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

import { environment } from '../environments/environment';
import { AppController } from './controllers/app.controller';
import { environmentProvider } from './providers/environment.provider';
import { AppService } from './services/app.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [],
      useFactory: () => ({
        headers: {
          'Cache-Control': 'public, no-cache, no-store, must-ravalidate, max-age=0',
          Expires: '-1',
          Pragma: 'no-cache',
        },
        timeout: 10000,
        maxRedirects: 5,
      }),
      inject: [],
    }),
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        cacheControl: false,
        maxAge: 0,
      },
      rootPath: environment.production
        ? path.join(__dirname, 'dist/', 'assets')
        : path.join(__dirname, '../', '../', '../', 'dist/', 'apps/', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, environmentProvider],
})
export class AppModule implements OnModuleDestroy {
  public onModuleDestroy() {
    Logger.verbose(`\n${new Date(Date.now())}: Received exit signal - terminating app...\n`);
  }
}
