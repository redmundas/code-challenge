import { omit } from 'ramda';
import { compose, mapProps } from 'recompose';

export default compose(
  mapProps,
  omit,
);
