import { Inject, Injectable } from '@angular/core';
import { Entity, EntityById, EntityServiceClient, nxngstarter } from '@app/proto';
import { Observable } from 'rxjs';

import { AppGrpcModule, GRPC_ENTITY_SERVICE_CLIENT } from './grpc.module';

@Injectable({
  providedIn: AppGrpcModule,
})
export class AppGrpcService {
  constructor(@Inject(GRPC_ENTITY_SERVICE_CLIENT) private readonly entityService: EntityServiceClient) {}

  public getEntityById() {
    const observable = new Observable<nxngstarter.IEntity>(observer => {
      const request = new EntityById();
      request.setId('id1');
      this.entityService.findOne(request, void 0, (error: Error | null, response: Entity | null) => {
        if (error !== null) {
          observer.error(error);
        }
        if (response !== null) {
          observer.next(<nxngstarter.IEntity>response.toObject());
          observer.complete();
        }
      });
    });
    return observable;
  }
}
