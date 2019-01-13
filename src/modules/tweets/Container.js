import { compose } from 'recompose';
import { withSources } from '../settings';
import Component from './Component';

export default compose(
  withSources,
)(Component);
