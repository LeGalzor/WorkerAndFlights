export interface Flight {
    num: string;
    from: string;
    to: string;
    from_date: string;
    to_date: string;
    plane: string;
    duration: string;
    from_gate: string;
    to_gate: string;
}

export interface FlightDetails {
    plane: string;
    duration: string;
    from_gate: string;
    to_gate: string;
}
