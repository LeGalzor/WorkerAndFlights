import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/core/http/api-service.service';
import { Flight } from 'src/shared/flight';
import { WorkerService } from 'src/core/services/worker.service';
import { FlightService } from 'src/core/services/flight.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  displayedColumns: string[] = [
    'flightNum',
    'origin',
    'originDate',
    'destination',
    'destinationDate'
  ];
  flights: Flight[] = [];
  dataSource: Flight[] = [];
  currentWorkerId: number = 1;
  selectedRowId: string = '';

  constructor(
    public api: ApiServiceService,
    public workerService: WorkerService,
    public flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.subscribeToCurrentWorker();
    this.subscribeToFlights();
    this.subscribeToCurrentFlight();
  }
  
  selectFlightRow(row: any) {
    const flightRow = row as Flight;
    this.flightService.setCurrentFlight(flightRow);
  }

  subscribeToFlights() {
    this.flightService.currentFlights$.subscribe(currentFlight => {
      this.flights = currentFlight;
    });
  }

  subscribeToCurrentFlight(){
    this.flightService.currentFlightSelected$.subscribe(currentFlightSelected => {
      this.selectedRowId = currentFlightSelected.num;
    });
  }

  subscribeToCurrentWorker() {
    this.workerService.currentWorkerId$.subscribe(newWorkerId => {
      this.currentWorkerId = newWorkerId;
      this.getFlightsFromApi();
      interval(60000).subscribe(() => {
        this.getFlightsFromApi();
      });
    });
  }
  getFlightsFromApi() {
    this.api.getFlights(this.currentWorkerId).subscribe(flights => {
      this.flightService.setFlights(flights);
    })
  }
}
