import { memo } from 'react';
import { compose, mapProps } from 'recompose';
import formatText from './formatText';
import Component from './Component';

export default compose(
  mapProps(({ text, mentions, ...props }) => ({
    text: formatText(text, mentions),
    ...props,
  })),
  memo,
)(Component);
