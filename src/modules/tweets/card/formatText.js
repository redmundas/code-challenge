import React, { Fragment } from 'react';
import { always, equals, flatten, identity, ifElse } from 'ramda';
import { Link } from './styled';

export default (text, mentions) =>
  flatten(
    text.split(' ').map(
      ifElse(equals('&amp;'), always('&'), identity)
    ).map(part => {
      // parse mentions
      if (part.startsWith('@') && mentions && mentions.length) {
        const mention = mentions.find(({ name }) =>
          part.toLowerCase().startsWith(`@${name.toLowerCase()}`));
        if (mention) {
          const { name, link } = mention;
          const rest = part.substr(name.length + 1);
          return [{ link, text: `@${name}` }, rest, ' '];
        }
      }
      // parse twitter links
      if (part.startsWith('https://t.co')) {
        return [{ link: part, text: part }, ' '];
      }
      return [part, ' '];
    })
  ).slice(0, -1).reduce((result, part) => {
    // concatenate all strings where possible
    const last = result.slice(-1).pop();
    if (typeof part === 'string' && typeof last === 'string') {
      return result.slice(0, -1).concat([last, part].join(''));
    }
    return result.concat(part);
  }, []).map((part, idx) => {
    if (typeof part !== 'string') {
      const { link, text } = part;
      return <Link key={`link-${idx}`} href={link} target="_blank">{text}</Link>;
    }
    return <Fragment key={`text-${idx}`}>{part}</Fragment>;
  });
