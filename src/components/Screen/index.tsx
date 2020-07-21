import * as React from 'react';
import * as PropTypes from 'prop-types';

import Map from '../Map';
import { defaultMapOptions } from '../../constants';

const Screen = () => {
  return (
    <div>
      <Map options={defaultMapOptions} />
    </div>
  );
};

export default Screen;
