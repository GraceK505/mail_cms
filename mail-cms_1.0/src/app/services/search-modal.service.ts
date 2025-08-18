import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchModalService {
  private _openModal = new Subject<any>();
  openModal$ = this._openModal.asObservable();

  open(data: any) {
    this._openModal.next(data);
  }
}
