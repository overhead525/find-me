import {
  CurrentQueryState,
  LocationState,
  QueryResultsState,
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

export const currentQueryReducer = (
  state: CurrentQueryState,
  action: ActionTypes
): CurrentQueryState => {
  switch (action.type) {
    case 'SET_CURRENT_QUERY':
      return {
        ...state,
        currentQuery: action.payload,
      } as CurrentQueryState;
    default:
      return { ...state } as CurrentQueryState;
  }
};

export const initQueryReducer = async (
  state: QueryResultsState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'INIT_QUERY':
      const formattedResultsArr: Array<string> = [];
      const retrieveSuggestions = (
        predictions: Array<google.maps.places.QueryAutocompletePrediction>,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          return;
        }

        predictions.forEach((prediction) => {
          formattedResultsArr.push(prediction.description);
        });
      };
      const service = new google.maps.places.AutocompleteService();
      await service.getQueryPredictions(
        {
          input: action.payload,
        },
        retrieveSuggestions
      );
      return {
        status: 1,
        results: formattedResultsArr,
      } as QueryResultsState;
    default:
      return { ...state } as QueryResultsState;
  }
};

export const queryReducer = async (state: QueryState, action: ActionTypes) => {
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
