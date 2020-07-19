import {
  LocationState,
  QueryState,
  queryResultsStatus,
} from '../shared/interfaces';
import { ActionTypes } from '../actions/types';

export const selectedLocationReducer = (
  state: LocationState,
  action: ActionTypes
): LocationState => {
  switch (action.type) {
    case 'INIT_SEARCH':
      return {
        ...state,
        status: 0,
      } as LocationState;
    case 'COMPLETE_SEARCH':
      return {
        ...state,
        status: 1,
        location: action.payload,
      } as LocationState;
    default:
      return { ...state } as LocationState;
  }
};

export const queryReducer = (state: QueryState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_CURRENT_QUERY':
      return {
        ...state,
        status: queryResultsStatus.LOADING,
        currentQuery: action.payload,
      } as QueryState;
    case 'RECEIVE_QUERY_RESULTS':
      return {
        ...state,
        status: queryResultsStatus.COMPLETED,
        results: action.payload,
      } as QueryState;
    default:
      return {
        ...state,
      };
  }
};
