import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Button from '@material-ui/core/Button';

import Screen from './components/Screen';

class App extends React.Component {
  render() {
    return (
      <>
        <Screen />
      </>
    );
  }
}

export default hot(App);
