import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import omitProps from '../../lib/omitProps';
import { getMessages } from './ducks';

export default compose(
  connect(
    createStructuredSelector({
      messages: getMessages,
    }),
  ),
  mapProps(({ source, messages, ...props }) => ({
    source,
    ...messages[source],
    ...props,
  })),
  omitProps(['dispatch']),
);
