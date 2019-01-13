import { memo } from 'react';
import { compose, withHandlers } from 'recompose';
import { withEditMode } from '../settings';
import Component from './Component';

export default compose(
  withEditMode,
  withHandlers({
    onToggleEditMode: ({ editMode, toggleEditMode }) => () => {
      toggleEditMode(!editMode);
    },
  }),
  memo,
)(Component);
