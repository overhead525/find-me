import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.scss';
import Root from './Root';

var mountNode = document.getElementById('app');
ReactDOM.render(<Root />, mountNode);
