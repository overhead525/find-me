import {
  locationStateStatus,
  LocationState,
  queryResultsStatus,
  QueryState,
} from '../src/shared/interfaces';
import { selectedLocationReducer, queryReducer } from '../src/reducers';
import { ActionTypes } from '../src/actions/types';

describe('test selectedLocationReducer', () => {
  const sampleLoadingState: LocationState = {
    status: locationStateStatus.PENDING,
    location: { lat: 47.6062, lng: 122.3321 },
  };

  const newLoadingState: LocationState = {
    status: locationStateStatus.PENDING,
    location: { lat: 40.7128, lng: 74.006 },
  };

  const sampleCompletedState: LocationState = {
    status: locationStateStatus.SELECTED,
    location: { lat: 40.7128, lng: 74.006 },
  };

  const initSearchAction: ActionTypes = {
    type: 'INIT_SEARCH',
    payload: null,
  };

  const completeSearchAction: ActionTypes = {
    type: 'COMPLETE_SEARCH',
    payload: { lat: 40.7128, lng: 74.006 },
  };

  const setCurrQueryAction: ActionTypes = {
    type: 'SET_CURRENT_QUERY',
    payload: 'whatever',
  };

  test('returns state unchanged if action.type not recognized in this reducer', () => {
    expect(
      selectedLocationReducer(sampleLoadingState, setCurrQueryAction)
    ).toStrictEqual(sampleLoadingState);
  });

  test('returns state with PENDING enum and new york city coordinates unchanged', () => {
    expect(
      selectedLocationReducer(sampleCompletedState, initSearchAction)
    ).toStrictEqual(newLoadingState);
  });

  test('returns state with completed enum and new york city coordinates', () => {
    expect(
      selectedLocationReducer(sampleLoadingState, completeSearchAction)
    ).toStrictEqual(sampleCompletedState);
  });
});

describe('test queryReducer', () => {
  const originalQueryState: QueryState = {
    currentQuery: 'pizza near Syd',
    status: queryResultsStatus.COMPLETED,
    results: [
      'pizza near Sydney NSW, Australia',
      'pizza near Sydney, NS, Canada',
      'pizza near Sydney Olympic Park NSW, Australia',
      'pizza near Sydney CBD, NSW, Australia',
      'pizza near Sydals, Denmark',
    ],
  };

  const newQueryState: QueryState = {
    currentQuery: 'pizza near New Yo',
    status: queryResultsStatus.COMPLETED,
    results: [
      'pizza near New York, NY, USA',
      'pizza near New York Mills, MN, USA',
      'pizza near New York, USA',
      'pizza near New York, IA, USA',
      'pizza near New York, Lincoln, UK',
    ],
  };

  const sampleNewCurrQueryState: QueryState = {
    currentQuery: 'pizza near New Yo',
    status: queryResultsStatus.LOADING,
    results: [
      'pizza near Sydney NSW, Australia',
      'pizza near Sydney, NS, Canada',
      'pizza near Sydney Olympic Park NSW, Australia',
      'pizza near Sydney CBD, NSW, Australia',
      'pizza near Sydals, Denmark',
    ],
  };

  const randomAction: ActionTypes = {
    type: 'COMPLETE_SEARCH',
    payload: { lat: 34.4567, lng: 65.3424 },
  };

  const setCurrQueryAction: ActionTypes = {
    type: 'SET_CURRENT_QUERY',
    payload: 'pizza near New Yo',
  };

  const receiveQueryResultsAction: ActionTypes = {
    type: 'RECEIVE_QUERY_RESULTS',
    payload: [
      'pizza near New York, NY, USA',
      'pizza near New York Mills, MN, USA',
      'pizza near New York, USA',
      'pizza near New York, IA, USA',
      'pizza near New York, Lincoln, UK',
    ],
  };

  test('returns state unchanged if action.type not recognized in this reducer', () => {
    expect(queryReducer(originalQueryState, randomAction)).toStrictEqual(
      originalQueryState
    );
  });

  test('returns state with status LOADING upon SET_CURRENT_QUERY action', () => {
    expect(queryReducer(originalQueryState, setCurrQueryAction)).toStrictEqual(
      sampleNewCurrQueryState
    );
  });

  test('returns state with status COMPLETED and updated autocomplete results upon RECEIVE_QUERY_RESULTS action', () => {
    expect(
      queryReducer(sampleNewCurrQueryState, receiveQueryResultsAction)
    ).toStrictEqual(newQueryState);
  });
});
