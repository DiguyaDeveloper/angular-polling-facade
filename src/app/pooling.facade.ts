import { interval, Observable, Subject } from 'rxjs';
import {
  filter,
  finalize,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';

export class PoolingFacade<T> {
  private pooling$ = new Subject<Observable<any>>();

  constructor(
    private functionSwitchMap: (value?: any) => Observable<T>,
    private functionTakeWhile: (value?: any) => boolean,
    private functionToFinalize: (value?: any) => void
  ) {}

  operation(value?: any): void {
    this.pooling$.next(
      interval(4000).pipe(
        switchMap(() => this.functionSwitchMap(value)),
        takeUntil(this.pooling$),
        filter((response: T) => !!response),
        takeWhile((response: T) => this.functionTakeWhile(response)),
        finalize(() => this.functionToFinalize())
      )
    );
  }

  setComplete(): void {
    this.pooling$.complete();
  }
}
