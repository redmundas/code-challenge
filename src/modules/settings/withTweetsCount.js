import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import omitProps from '../../lib/omitProps';
import { getTweetsCount, updateTweetsCount } from './ducks';

export default compose(
  connect(
    createStructuredSelector({
      tweetsCount: getTweetsCount,
    }),
    {
      updateTweetsCount,
    }
  ),
  omitProps(['dispatch']),
);
