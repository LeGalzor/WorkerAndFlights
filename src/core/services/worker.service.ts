import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor() { }

  public currentWorkerId = new Subject<number>();
  currentWorkerId$ = this.currentWorkerId.asObservable();

  selectWorker(id: number){
    this.currentWorkerId.next(id);
  }

}
