import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb';


export class EntityServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  findOne(
    request: common_pb.EntityById,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: common_pb.Entity) => void
  ): grpcWeb.ClientReadableStream<common_pb.Entity>;

}

export class EntityServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  findOne(
    request: common_pb.EntityById,
    metadata?: grpcWeb.Metadata
  ): Promise<common_pb.Entity>;

}

