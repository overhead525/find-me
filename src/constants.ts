import {
  LocationState,
  QueryState,
  locationStateStatus,
  queryResultsStatus,
} from './shared/interfaces';

export const defaultState: {
  locationState: LocationState;
  queryState: QueryState;
} = {
  locationState: {
    status: locationStateStatus.SELECTED,
    location: {
      lat: 35.7796,
      lng: 79.6382,
    },
  },
  queryState: {
    status: queryResultsStatus.COMPLETED,
    currentQuery: '',
    results: [],
  },
};
