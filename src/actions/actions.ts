import { Dispatch, Store } from 'redux';

import { Location } from '../shared/interfaces';
import {
  INIT_SEARCH,
  COMPLETE_SEARCH,
  SET_CURRENT_QUERY,
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
export interface relaxedPlacesPrediction {
  description: string;
}

export const getAutoCompleteResults = async (
  input: string,
  service: google.maps.places.AutocompleteService,
  arr: Array<string>,
  store: Store
) => {
  store.dispatch(setCurrentQuery(input));
  const retrieveSuggestions = (
    predictions: Array<relaxedPlacesPrediction>,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status != 'OK') {
      return;
    }

    predictions.forEach((prediction) => {
      arr.push(prediction.description);
    });
  };
  await service.getQueryPredictions(
    {
      input: input,
    },
    retrieveSuggestions
  );
  store.dispatch(receiveQueryResults(arr));
};

export const getAutoCompleteResultsIn = async (
  input: string,
  service: google.maps.places.AutocompleteService,
  arr: Array<string>
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setCurrentQuery(input));
    const retrieveSuggestions = (
      predictions: Array<relaxedPlacesPrediction>,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status != 'OK') {
        return;
      }

      predictions.forEach((prediction) => {
        arr.push(prediction.description);
      });
    };
    await service.getQueryPredictions(
      {
        input: input,
      },
      retrieveSuggestions
    );
    dispatch(receiveQueryResults(arr));
  };
};
