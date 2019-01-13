import {curry, reduce, assoc, keys} from 'ramda';

/**
 * Source: https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * @sig {a: b} -> {a: *} -> {b: *}
 */
export default curry((keysMap, obj) =>
  reduce(
    (acc, key) => assoc(keysMap[key] || key, obj[key], acc),
    {},
    keys(obj),
  ),
);
