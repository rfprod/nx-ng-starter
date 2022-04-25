import { AppApiEnvironment } from '@app/backend-interfaces';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { AppGrpcController } from './controller/grpc.controller';
import { backendGrpcClientOptions, NXNGSTARTER_PACKAGE } from './grpc-client.options';

@Module({
  controllers: [AppGrpcController],
})
export class AppGrpcModule {
  public static forRoot(env: AppApiEnvironment): DynamicModule {
    const grpcClientOptions = backendGrpcClientOptions(env);

    return {
      module: AppGrpcModule,
      imports: [
        ClientsModule.register([
          {
            name: NXNGSTARTER_PACKAGE,
            ...grpcClientOptions,
          },
        ]),
      ],
    };
  }
}
