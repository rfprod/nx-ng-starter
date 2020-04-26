import { ClientOptions, Transport } from '@nestjs/microservices';
import { environment } from 'apps/api/src/environments/environment';
import { join } from 'path';

export const NXNGSTARTER_PACKAGE = 'NXNGSTARTER_PACKAGE';

const localProtoPath = [join(__dirname, '..', '..', '..', 'tools/proto/root.proto')];
const functionsProtoPath = [join(__dirname, 'proto/root.proto')];

const protoPaths: () => string[] = () => {
  return !environment.firebase ? [...localProtoPath] : [...functionsProtoPath];
};

const rpcUrl = '0.0.0.0:50051';

/**
 * Grpc client options.
 */
export const grpcApiClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: rpcUrl,
    package: ['nxngstarter'],
    protoPath: protoPaths(),
  },
};
