import { flatten, map, pipe } from 'ramda';
import { DEV_ENV } from '../config';

const noop = () => {};
/* eslint-disable no-console */
const debug = DEV_ENV ? console.log : noop;
const error = DEV_ENV ? console.error : noop;
const info = DEV_ENV ? console.log : noop;
const warn = DEV_ENV ? console.warn : noop;

const wrapArgs = pipe(
  map(arg => ['▶', arg]),
  flatten,
);

export default {
  debug: (...args) => {
    debug('DEBUG', ...wrapArgs(args));
  },
  error: (...args) => {
    error('ERROR', ...wrapArgs(args));
  },
  info: (...args) => {
    info('INFO', ...wrapArgs(args));
  },
  warn: (...args) => {
    warn('WARN', ...wrapArgs(args));
  },
};
