import { ApiEnvironment } from '@app/backend-interfaces';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const NXNGSTARTER_PACKAGE = 'NXNGSTARTER_PACKAGE';

const localProtoPath = [join(__dirname, '..', '..', '..', 'tools/proto/root.proto')];
const functionsProtoPath = [join(__dirname, 'proto/root.proto')];

/**
 * Proto file paths.
 */
const protoPaths: (env: ApiEnvironment) => string[] = (env: ApiEnvironment) => {
  return typeof env.firebase === 'undefined' || !env.firebase ? [...localProtoPath] : [...functionsProtoPath];
};

const rpcUrl = '0.0.0.0:15001';

/**
 * Grpc client options.
 */
export const backendGrpcClientOptions: (env: ApiEnvironment) => ClientOptions = (env: ApiEnvironment) => ({
  transport: Transport.GRPC,
  options: {
    url: rpcUrl,
    package: ['nxngstarter'],
    protoPath: protoPaths(env),
  },
});
