import { TestBed, async } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';

import { EventEmitterService } from './event-emitter.service';

describe('EventEmitterService', () => {

  let service: EventEmitterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'Window', useValue: window },
        EventEmitterService
      ]
    }).compileComponents().then(() => {
      service = TestBed.get(EventEmitterService) as EventEmitterService;
      spyOn(service['emitter'], 'emit');
    });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should have variables and methods defined', () => {
    expect(service['emitter']).toBeDefined();
    expect(service['emitter']).toEqual(jasmine.any(EventEmitter));
    expect(service.getEmitter).toEqual(jasmine.any(Function));
    expect(service.emitEvent).toEqual(jasmine.any(Function));
    expect(service.filterByPath).toEqual(jasmine.any(Function));
  });

  it('emitEvent should call emitter.emit method', () => {
    const msg: object = { message: 'test' };
    service.emitEvent(msg);
    expect(service['emitter'].emit).toHaveBeenCalledWith(msg);
  });

  it('getEmitter should return emitter', () => {
    expect(service.getEmitter()).toEqual(jasmine.any(EventEmitter));
    expect(service.getEmitter()).toEqual(service['emitter']);
  });

  it('filterByPath should filter event by correct path', async(() => {
    const path: string = 'x.y.z';

    spyOn(service['emitter'], 'pipe').and.callThrough();

    service.filterByPath(path).subscribe(
      (data: any) => console.log('data', data),
      (error: any) => console.log('error', error)
    );

    expect(service['emitter'].pipe).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
  }));

});
