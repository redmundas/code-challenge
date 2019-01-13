import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import omitProps from '../../lib/omitProps';
import { getEditMode, toggleEditMode } from './ducks';

export default compose(
  connect(
    createStructuredSelector({
      editMode: getEditMode,
    }),
    {
      toggleEditMode,
    }
  ),
  omitProps(['dispatch']),
);
