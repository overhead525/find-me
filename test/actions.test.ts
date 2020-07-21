import * as actions from '../src/actions/actions';
import * as types from '../src/actions/types';
import {
  Location,
  QueryState,
  queryResultsStatus,
} from '../src/shared/interfaces';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('synchronous actions', () => {
  test('should create an action to signify user clicking search bar', () => {
    const expectedAction: types.ActionTypes = {
      type: types.INIT_SEARCH,
      payload: null,
    };
    expect(actions.initSearch()).toEqual(expectedAction);
  });
  test('should create an action to signify user submitting a search', () => {
    const sampleLocation: Location = { lat: 30.456, lng: 40.567 };
    const expectedAction: types.ActionTypes = {
      type: types.COMPLETE_SEARCH,
      payload: sampleLocation,
    };
    expect(actions.completeSearch(sampleLocation)).toEqual(expectedAction);
  });
  test('should create an action to reflect user typing in the search bar', () => {
    const inputText = 'Shady Si';
    const expectedAction: types.ActionTypes = {
      type: types.SET_CURRENT_QUERY,
      payload: inputText,
    };
    expect(actions.setCurrentQuery(inputText)).toEqual(expectedAction);
  });
  test('should create an action to reflect that google places api response was successful', () => {
    const results = [
      'pizza near New York, NY, USA',
      'pizza near New York Mills, MN, USA',
      'pizza near New York, USA',
      'pizza near New York, IA, USA',
      'pizza near New York, Lincoln, UK',
    ];
    const expectedAction: types.ActionTypes = {
      type: types.RECEIVE_QUERY_RESULTS,
      payload: results,
    };
    expect(actions.receiveQueryResults(results)).toEqual(expectedAction);
  });
});

describe('asynchronous actions', () => {
  const mockService: google.maps.places.AutocompleteService = {
    getPlacePredictions: jest.fn(),
    getQueryPredictions: jest.fn(),
  };

  test('getAutoCompleteResults should dispatch two actions to store', async () => {
    const mockService = {
      getPlacePredictions: jest.fn(),
      getQueryPredictions: jest
        .fn()
        .mockImplementation((input: Object, callback: Function) =>
          callback(samplePlacesPredictions, 'OK')
        ),
    };
    jest.spyOn(actions, 'receiveQueryResults').mockImplementationOnce(() => {
      return {
        type: 'RECEIVE_QUERY_RESULTS',
        payload: [
          'pizza near Sydney NSW, Australia',
          'pizza near Sydney, NS, Canada',
          'pizza near Sydney Olympic Park NSW, Australia',
          'pizza near Sydney CBD, NSW, Australia',
          'pizza near Sydals, Denmark',
        ],
      } as types.ActionTypes;
    });
    jest.spyOn(actions, 'setCurrentQuery').mockImplementationOnce(() => {
      return {
        type: 'SET_CURRENT_QUERY',
        payload: sampleQuery,
      };
    });
    const sampleQuery = 'pizza near Syd';
    const sampleQueryResults = [
      'pizza near Sydney NSW, Australia',
      'pizza near Sydney, NS, Canada',
      'pizza near Sydney Olympic Park NSW, Australia',
      'pizza near Sydney CBD, NSW, Australia',
      'pizza near Sydals, Denmark',
    ];
    const samplePlacesPredictions: Array<actions.relaxedPlacesPrediction> = [
      { description: 'pizza near Sydney NSW, Australia' },
      { description: 'pizza nead Sydney, NS, Canada' },
      { description: 'pizza near Sydney Olympic Park NSW, Australia' },
      { description: 'pizza near Sydney CBD, NSW, Australia' },
      { description: 'pizza near Sydals, Denmark' },
    ];

    const initialQueryState: QueryState = {
      currentQuery: '',
      status: queryResultsStatus.COMPLETED,
      results: [],
    };

    const expectedActions = [
      {
        type: types.SET_CURRENT_QUERY,
        payload: sampleQuery,
      },
      {
        type: types.RECEIVE_QUERY_RESULTS,
        payload: sampleQueryResults,
      },
    ];

    const store = mockStore(initialQueryState);
    jest.spyOn(store, 'dispatch');
    const arr = [];
    await actions.getAutoCompleteResults(sampleQuery, mockService, arr, store);
    expect(mockService.getQueryPredictions).toHaveBeenCalled();
    expect(actions.setCurrentQuery).toHaveBeenCalled();
    expect(actions.receiveQueryResults).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
