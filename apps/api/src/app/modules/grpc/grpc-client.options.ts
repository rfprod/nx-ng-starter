import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { environment } from '../../../environments/environment';

export const NXNGSTARTER_PACKAGE = 'NXNGSTARTER_PACKAGE';

const localProtoPath = [join(__dirname, '..', '..', '..', 'tools/proto/root.proto')];
const functionsProtoPath = [join(__dirname, 'proto/root.proto')];

const protoPaths: () => string[] = () => {
  return !Boolean(environment.firebase) ? [...localProtoPath] : [...functionsProtoPath];
};

const rpcUrl = '0.0.0.0:15001';

/**
 * Grpc client options.
 */
export const apiGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: rpcUrl,
    package: ['nxngstarter'],
    protoPath: protoPaths(),
  },
};
