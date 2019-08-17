import {
  Injectable,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs';

import { pluck, filter } from 'rxjs/operators';

/**
 * Global Event Emitter service that should be used to broadcast event across components.
 */
@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  /**
   * EventEmitter instance.
   */
  private emitter: EventEmitter<object> = new EventEmitter();

  /**
   * Public method to get EventEmitter instance.
   */
  public getEmitter(): EventEmitter<object> {
    return this.emitter;
  }

  /**
   * Filter emmited value for specific payload property
   * @param path dot separated path to payload property
   * Example: { filter: { order: { status: 'free' }}} should be filtered by 'filter.order.status'
   */
  public filterByPath(path: string): Observable<any | undefined> {
    const pathArray = path.split('.');

    return this.emitter.pipe(
      pluck.apply(null, pathArray),
      filter(val => val !== undefined),
    );
  }

  /**
   * Emits event.
   * @param object actual event
   */
  public emitEvent(object: any): void {
    this.emitter.emit(object);
  }

  /**
   * Emits event with single value located by path.
   * @param path to value to emit
   * @param value to emit
   */
  public emitByPath(path: string, value: any): void {
    const pathArray = path.split('.').reverse();
    const hash = pathArray.reduce(
      (acc, key, i) => ({[key] : i === 0 ? value : acc}),
      {});

    this.emitter.emit(hash);
  }

}
