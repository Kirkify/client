import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { VerySimpleLoaderInterface } from './very-simple-loader.interface';

export class VerySimpleLoaderClass {

  private readonly _cancellable: boolean;
  // You can pass in another observable to use as the loader
  // This can be the case if a service handles setting loading status
  private readonly _otherLoader: Observable<boolean>;
  private _message: BehaviorSubject<string>;
  private _loading: BehaviorSubject<boolean>;
  private _cancel = new Subject();
  private _hasBackground: BehaviorSubject<boolean>;

  constructor(input: VerySimpleLoaderInterface = {}) {
    const {
      loader = null,
      cancellable = true,
      message = 'Loading...',
      loading = false,
      hasBackground = true
    } = input;
    this._otherLoader = loader;
    this._cancellable = cancellable;
    this._message = new BehaviorSubject(message);
    this._loading = new BehaviorSubject(loading);
    this._hasBackground = new BehaviorSubject(hasBackground);
  }

  isCancellable(): boolean {
    return this._cancellable;
  }

  selectLoading(): Observable<boolean> {
    if (this._otherLoader) {
      return this._otherLoader;
    }
    return this._loading.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  setLoadingStatus(value: boolean): void {
    if (this._otherLoader) {
      throw new Error('Another loader has been set, you cannot update it');
    }
    this._loading.next(value);
  }

  getCancellableSubject(): Observable<any> {
    return this._cancel.asObservable();
  }

  cancel(): void {
    this._cancel.next();
  }

  selectMessage(): Observable<string> {
    return this._message.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  setLoadingMessage(value: string): void {
    this._message.next(value);
  }

  selectHasBackground(): Observable<boolean> {
    return this._hasBackground.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  setHasBackground(value: boolean): void {
    this._hasBackground.next(value);
  }
}
