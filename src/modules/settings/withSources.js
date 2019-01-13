import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import omitProps from '../../lib/omitProps';
import { getSources } from './ducks';

export default compose(
  connect(
    createStructuredSelector({
      sources: getSources,
    })
  ),
  omitProps(['dispatch']),
);
