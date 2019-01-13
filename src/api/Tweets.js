import { map, pick, pipe, prop, propOr, uniq } from 'ramda';
import Base from './Base';
import {API_URL, TWEETS_COUNT} from '../config';
import renameKeys from '../lib/renameKeys';

export default class Tweets extends Base {
  base = API_URL;

  getTweets(screen_name, count = TWEETS_COUNT) {
    return this.get({
      path: '1.1/statuses/user_timeline.json',
      data: { screen_name, count },
    }).then(response => {
      const { data } = response;
      if (!data) {
        return response;
      }
      return {
        data: map(
          pipe(
            pick(['id_str', 'text', 'created_at', 'entities']),
            renameKeys({ id_str: 'id', created_at: 'createdAt' }),
            ({ id, entities, ...props }) => ({
              id,
              url: `https://twitter.com/${screen_name}/status/${id}`,
              mentions: pipe(
                propOr([], 'user_mentions'),
                map(prop('screen_name')),
                uniq,
                map(name => ({
                  name,
                  link: `https://twitter.com/${name}`,
                })),
              )(entities),
              ...props,
            })
          )
        )(data),
      };
    });
  }
}
