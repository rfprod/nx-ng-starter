import * as grpcWeb from 'grpc-web';
import * as common_pb from './common_pb';

export class SampleServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  sampleServiceMethod(
    request: common_pb.SampleServiceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: common_pb.SampleServiceResponse) => void
  ): grpcWeb.ClientReadableStream<common_pb.SampleServiceResponse>;

}

export class SampleServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  sampleServiceMethod(
    request: common_pb.SampleServiceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<common_pb.SampleServiceResponse>;

}

