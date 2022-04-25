import { Module } from '@nestjs/common';

import { AppEventsGateway } from './gateway/events.gateway';

@Module({
  providers: [AppEventsGateway],
})
export class AppWebsocketModule {}
