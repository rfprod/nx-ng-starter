import { AppApiEnvironment } from '@app/backend-interfaces';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const NXNGSTARTER_PACKAGE = 'NXNGSTARTER_PACKAGE';

const localProtoPath = [join(__dirname, '..', '..', '..', 'tools/proto/root.proto')];
const functionsProtoPath = [join(__dirname, 'proto/root.proto')];

/**
 * Proto file paths.
 */
const protoPaths: (env: AppApiEnvironment) => string[] = (env: AppApiEnvironment) => {
  return typeof env.firebase === 'undefined' || !env.firebase ? [...localProtoPath] : [...functionsProtoPath];
};

/**
 * Grpc client options.
 */
export const backendGrpcClientOptions: (env: AppApiEnvironment) => ClientOptions = (env: AppApiEnvironment) => ({
  transport: Transport.GRPC,
  options: {
    url: env.grpcUrl,
    package: 'nxngstarter',
    protoPath: protoPaths(env),
    loader: {
      keepCase: true,
      oneofs: true,
      defaults: true,
      objects: true,
      arrays: true,
    },
  },
});
