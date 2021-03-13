import { Module } from '@nestjs/common';

import { BackendEventsGateway } from './gateway/events.gateway';

@Module({
  providers: [BackendEventsGateway],
})
export class BackendWebsocketModule {}
