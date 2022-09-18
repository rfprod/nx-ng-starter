import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@app/client-util';
import { EntityServiceClient } from '@app/proto';

export const GRPC_ENTITY_SERVICE_CLIENT = new InjectionToken<string>('GRPC_ENTITY_SERVICE_CLIENT');

@NgModule({})
export class AppGrpcModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppGrpcModule> {
    return {
      ngModule: AppGrpcModule,
      providers: [
        {
          provide: GRPC_ENTITY_SERVICE_CLIENT,
          useFactory: () => new EntityServiceClient(`${env.envoyUrl}`, { withCredentials: 'true' }),
        },
      ],
    };
  }
}
