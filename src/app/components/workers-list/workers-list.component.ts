import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { ApiServiceService } from 'src/core/http/api-service.service';
import { QuestWorker } from 'src/shared/quest-worker';
import { WorkerService } from 'src/core/services/worker.service';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  questWorkers: QuestWorker[] = [];
  currentWorkerId: number = -1;

  constructor(public api: ApiServiceService, public workerService: WorkerService) { }

  ngOnInit(): void {
    this.subscribeToWorkers();
    this.subscribeToCurrentWorker();
  }
  subscribeToCurrentWorker(): any {
    this.workerService.currentWorkerId$.subscribe(data => {
      this.currentWorkerId = data;
    })
  }
  init() {
    if (this.questWorkers.length){
      const firstWorkerId = this.questWorkers[0].id;
      this.workerService.selectWorker(firstWorkerId);
    }
  }
  subscribeToWorkers() {
    this.api.getWorkers().subscribe(data => {
      this.questWorkers = data;
      this.init();
    })
  }

  handleListClick(workerId: number){
    this.workerService.selectWorker(workerId);
  }

  selectFirstWorkerFlights() {
      if (this.questWorkers.length){
        this.workerService.selectWorker(this.questWorkers[0].id);
      }
  }
}
