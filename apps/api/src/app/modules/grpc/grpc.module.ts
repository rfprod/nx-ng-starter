import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ApiGrpcController } from './controller/grpc.controller';
import { apiGrpcClientOptions, NXNGSTARTER_PACKAGE } from './grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NXNGSTARTER_PACKAGE,
        ...apiGrpcClientOptions,
      },
    ]),
  ],
  controllers: [ApiGrpcController],
})
export class ApiGrpcApiModule {}
