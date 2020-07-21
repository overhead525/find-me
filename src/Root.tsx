import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';

import { defaultState } from './constants';

const store = configureStore(defaultState);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
