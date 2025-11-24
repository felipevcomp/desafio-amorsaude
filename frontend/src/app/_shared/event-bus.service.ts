import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EventData } from './event.class';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject<EventData>();

  /**
   *
   * @param event
   * @param event.name
   * @param event.value
   */
  emit(event: { name: string; value: null }) {
    this.subject$.next(event);
  }

  /**
   *
   * @param eventName
   * @param action
   */
  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}
