import { Module } from '@nestjs/common';

import { ApiEventsGateway } from './gateway/events.gateway';

@Module({
  providers: [ApiEventsGateway],
})
export class ApiWebsocketModule {}
