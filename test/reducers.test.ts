import {
  locationStateStatus,
  LocationState,
  CurrentQueryState,
  QueryResultsState,
  queryResultsStatus,
} from '../src/shared/interfaces';
import {
  selectedLocationReducer,
  currentQueryReducer,
  initQueryReducer,
} from '../src/reducers';
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

  const initQueryAction: ActionTypes = {
    type: 'INIT_QUERY',
    payload: 'whatever',
  };

  test('returns state unchanged if action.type not recognized in this reducer', () => {
    expect(
      selectedLocationReducer(sampleLoadingState, initQueryAction)
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

/*
describe('test currentQueryReducer', () => {
  const sampleCurrQueryState: CurrentQueryState = {
    currentQuery: 'Shady S',
  };

  const sampleCurrQueryState2: CurrentQueryState = {
    currentQuery: 'Shady Si',
  };

  const sampleCurrQueryAction: ActionTypes = {
    type: 'SET_CURRENT_QUERY',
    payload: 'Shady Si',
  };

  const sampleCurrQueryAction2: ActionTypes = {
    type: 'SET_CURRENT_QUERY',
    payload: 'Shady S',
  };

  test('returns state unchanged if action.type not recognized in this reducer', () => {
    expect(
      currentQueryReducer(sampleCurrQueryState, sampleCurrQueryAction)
    ).toStrictEqual(sampleCurrQueryState2);
  });

  test('returns state with Shady Si after receiving state with Shady S and action', () => {
    expect(
      currentQueryReducer(sampleCurrQueryState, sampleCurrQueryAction)
    ).toStrictEqual(sampleCurrQueryState2);
  });

  test('returns state with Shady S after receiving action with Shady S', () => {
    expect(
      currentQueryReducer(sampleCurrQueryState2, sampleCurrQueryAction2)
    ).toStrictEqual(sampleCurrQueryState);
  });
});
*/

describe('test initQueryReducer', () => {
  const initialQueryResultsState: QueryResultsState = {
    status: queryResultsStatus.LOADING,
    results: [],
  };

  const sampleQueryResultsAction: ActionTypes = {
    type: 'INIT_QUERY',
    payload: null,
  };

  const completedQueryResultsState: QueryResultsState = {
    status: queryResultsStatus.COMPLETED,
    results: ['Shady Side, Pennsylvania, PA'],
  };

  test('returns state unchanged if action.type not recognized in this reducer', () => {
    expect(
      initQueryReducer(initialQueryResultsState, sampleQueryResultsAction)
    ).toStrictEqual(completedQueryResultsState);
  });
});
