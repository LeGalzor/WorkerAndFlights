import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Flight, FlightDetails } from 'src/shared/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  public currentFlights = new Subject<Flight[]>();
  currentFlights$ = this.currentFlights.asObservable();

  public currentFlightSelected = new Subject<Flight>();
  currentFlightSelected$ = this.currentFlightSelected.asObservable();

  public currentFlightDetails = new Subject<FlightDetails>();
  currentFlightDetails$ = this.currentFlightDetails.asObservable();

  constructor() { }

  setFlights(newFlights: Flight[]){
    this.currentFlights.next(newFlights);
    this.setCurrentFlight(newFlights[0]);
    this.setFlightDetails(newFlights[0]);
  }

  setCurrentFlight(newFlight: Flight){
    this.currentFlightSelected.next(newFlight);
    const currentDetails = this.extractFlightDetails(newFlight);
    this.setFlightDetails(currentDetails);
  }

  setFlightDetails(newDetails: FlightDetails){
    this.currentFlightDetails.next(newDetails);
  }
  extractFlightDetails(currentFlight: Flight){
    const flightDetails: FlightDetails = {
      plane: currentFlight.plane,
      duration: currentFlight.duration,
      from_gate: currentFlight.from_gate,
      to_gate: currentFlight.to_gate
    };
    return flightDetails;
  }
}
