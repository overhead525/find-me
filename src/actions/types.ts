import { Location } from '../shared/interfaces';

export const INIT_SEARCH = 'INIT_SEARCH';
export const COMPLETE_SEARCH = 'COMPLETE_SEARCH';
export const SET_CURRENT_QUERY = 'SET_CURRENT_QUERY';
export const RECEIVE_QUERY_RESULTS = 'RECEIVE_QUERY_RESULTS';

interface InitSearchAction {
  type: typeof INIT_SEARCH;
  payload: null;
}

interface CompleteSearchAction {
  type: typeof COMPLETE_SEARCH;
  payload: Location;
}

interface SetCurrentQueryAction {
  type: typeof SET_CURRENT_QUERY;
  payload: string;
}

interface ReceiveQueryResultsAction {
  type: typeof RECEIVE_QUERY_RESULTS;
  payload: Array<string>;
}

export type ActionTypes =
  | InitSearchAction
  | CompleteSearchAction
  | SetCurrentQueryAction
  | ReceiveQueryResultsAction;
