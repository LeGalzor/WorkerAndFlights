import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/core/services/flight.service';
import { FlightDetails } from 'src/shared/flight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  currentFlightDetails: FlightDetails = { plane: '', duration: '', from_gate: '', to_gate: '' };

  constructor(public flightService: FlightService) {}

  ngOnInit(): void {
    this.subscribeToFlightDetails();
  }

  subscribeToFlightDetails() {
    this.flightService.currentFlightDetails$.subscribe(data => {
      this.currentFlightDetails = data;
    })
  }
}
