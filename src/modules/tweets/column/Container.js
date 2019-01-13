import { memo } from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { withEditMode, withTweetsCount } from '../../settings';
import { updateOrder } from '../../settings';
import withMessages from '../withMessages';
import Component from './Component';

export default compose(
  connect(
    null,
    {
      updateOrder,
    }
  ),
  withEditMode,
  withMessages,
  withTweetsCount,
  mapProps(({ tweetsCount, source, ...props }) => ({
    tweetsCount: tweetsCount[source],
    source,
    ...props,
  })),
  withHandlers({
    onChangeTweetsCount: ({ source, updateTweetsCount }) => event => {
      updateTweetsCount(source, Number(event.target.value));
    },
    onMoveLeft: ({ source, updateOrder }) => () => {
      updateOrder(source, -1);
    },
    onMoveRight: ({ source, updateOrder }) => () => {
      updateOrder(source, 1);
    },
  }),
  memo,
)(Component);
