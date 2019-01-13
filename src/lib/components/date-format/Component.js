import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { identity, memoizeWith } from 'ramda';
import locale2 from 'locale2';

const memoizedDateFormat = memoizeWith(
  identity,
  locale =>
    new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: false,
    }),
);

const DateFormat = ({ locale = locale2, value }) => (
  <Fragment>{memoizedDateFormat(locale).format(new Date(value))}</Fragment>
);

DateFormat.propTypes = {
  locale: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DateFormat;
