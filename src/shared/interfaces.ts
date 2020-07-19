export enum locationStateStatus {
  PENDING,
  SELECTED,
}

export enum queryResultsStatus {
  LOADING,
  COMPLETED,
}

export interface Location {
  lat: number;
  lng: number;
}

export interface LocationState {
  status: locationStateStatus;
  location: Location;
}

export interface QueryState {
  currentQuery: string;
  status: queryResultsStatus;
  results: Array<string>;
}
