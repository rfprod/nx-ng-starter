import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { nxngstarter } from '@nx-ng-starter/proto';
import { from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { NXNGSTARTER_PACKAGE } from '../grpc-client.options';

export interface IEntityService {
  findOne(data: nxngstarter.IEntityById): Observable<nxngstarter.IEntity>;
  findMany(upstream: Observable<nxngstarter.IEntityById>): Observable<nxngstarter.IEntity>;
}

@Controller('grpc')
export class BackendGrpcController implements OnModuleInit {
  private readonly items: nxngstarter.IEntity[] = [
    {
      id: 'id1',
      num1: 1,
      num2: 3,
      boolean1: true,
      float1: 0.5,
      any1: null,
      subEntities: [],
    },
    {
      id: 'id2',
      num1: 2,
      num2: 4,
      boolean1: false,
      float1: 1.5,
      any1: null,
      subEntities: [{ id: 'subid1' }],
    },
  ];

  private sampleService?: IEntityService;

  constructor(@Inject(NXNGSTARTER_PACKAGE) private readonly client: ClientGrpc) {}

  public onModuleInit() {
    this.sampleService = this.client.getService<IEntityService>('EntityService');
  }

  @Get()
  public getMany(): Observable<nxngstarter.IEntity[]> {
    const ids$ = new ReplaySubject<nxngstarter.IEntityById>();
    ids$.next({ id: 'id1' });
    ids$.next({ id: 'id2' });
    ids$.complete();

    return typeof this.sampleService !== 'undefined'
      ? this.sampleService.findMany(ids$.asObservable()).pipe(toArray())
      : of([]);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Observable<nxngstarter.IEntity> {
    return typeof this.sampleService !== 'undefined'
      ? from(this.sampleService.findOne({ id }))
      : of(
          nxngstarter.Entity.toObject(new nxngstarter.Entity(), {
            defaults: true,
          }),
        );
  }

  @GrpcMethod('EntityService', 'FindOne')
  public findOne(
    data: nxngstarter.IEntityById,
    metadata: Record<string, unknown>,
  ): nxngstarter.IEntity | undefined {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('EntityService', 'FindMany')
  public findMany(
    data$: Observable<nxngstarter.IEntityById>,
    metadata: Record<string, unknown>,
  ): Observable<nxngstarter.IEntity> {
    const entity$ = new Subject<nxngstarter.IEntity>();

    const onNext = (entityById: nxngstarter.IEntityById) => {
      const item = this.items.find(({ id }) => id === entityById.id);
      entity$.next(item);
    };
    const onComplete = () => {
      entity$.complete();
    };
    void data$.subscribe(onNext, null, onComplete);

    return entity$.asObservable();
  }
}
