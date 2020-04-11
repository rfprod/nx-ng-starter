import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const NXNGSTARTER_PACKAGE = 'NXNGSTARTER_PACKAGE';

/**
 * Grpc client options.
 */
export const grpcApiClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['nxngstarter'],
    protoPath: [join(__dirname, '../../../tools/proto/root.proto')],
  },
};
