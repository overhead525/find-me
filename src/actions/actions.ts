import { Location } from '../shared/interfaces';
import {
  INIT_SEARCH,
  COMPLETE_SEARCH,
  SET_CURRENT_QUERY,
  INIT_QUERY,
  RECEIVE_QUERY_RESULTS,
  ActionTypes,
} from './types';

// Action Creators
export const initSearch = (): ActionTypes => {
  return {
    type: INIT_SEARCH,
    payload: null,
  };
};

export const completeSearch = (location: Location): ActionTypes => {
  return {
    type: COMPLETE_SEARCH,
    payload: location,
  };
};

export const setCurrentQuery = (input: string): ActionTypes => {
  return {
    type: SET_CURRENT_QUERY,
    payload: input,
  };
};

export const initQuery = (input: string): ActionTypes => {
  return {
    type: INIT_QUERY,
    payload: input,
  };
};

export const receiveQueryResults = (results: Array<string>): ActionTypes => {
  return {
    type: RECEIVE_QUERY_RESULTS,
    payload: results,
  };
};

// Once the UI components get set up, this function can be imported into the Search
// component and called on the input updates. So
// 1. User enters a letter
// 2. Letter is reflected in state
// 3. State update reloads component
// 4. component update triggers this function to update queryResults state
// 5. Dropdown of query results is visible on screen
export const getAutoCompleteResults = (input: string) => {
  return async (dispatch) => {
    dispatch(setCurrentQuery(input));
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
        input: input,
      },
      retrieveSuggestions
    );
    dispatch(receiveQueryResults(formattedResultsArr));
  };
};
