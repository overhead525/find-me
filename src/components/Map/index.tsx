import * as React from 'react';
import * as PropTypes from 'prop-types';

import { defaultMapOptions } from '../../constants';

interface MapProps {
  options: google.maps.MapOptions;
}

export default class Map extends React.Component<MapProps> {}
