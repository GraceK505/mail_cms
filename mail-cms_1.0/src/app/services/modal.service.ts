import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _openModal = new Subject<any>();
  openModal$ = this._openModal.asObservable();

  private _errorModal = new Subject<any>();
  errorModal$ = this._errorModal.asObservable();

  open(data: any) {
    this._openModal.next(data);
  }

  erroModal(error: any, message: string) {
    this._errorModal.next({error, message})
  }
}
