import { Module } from '@nestjs/common';

import { EventsGateway } from './gateway/events.gateway';

@Module({
  providers: [EventsGateway],
})
export class WebsocketApiModule {}
