import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@app/client-util';
import { EntityServiceClient } from '@app/proto';

export const GRPC_ENTITY_SERVICE_CLIENT = new InjectionToken<string>('GRPC_ENTITY_SERVICE_CLIENT');

@NgModule({})
export class AppClientGrpcModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppClientGrpcModule> {
    return {
      ngModule: AppClientGrpcModule,
      providers: [
        {
          provide: GRPC_ENTITY_SERVICE_CLIENT,
          useFactory: () => new EntityServiceClient(`${env.envoyUrl}`, { withCredentials: 'true' }),
        },
      ],
    };
  }
}
