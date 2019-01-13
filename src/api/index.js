import Tweets from './Tweets';

const tweets = new Tweets();

export const getTweets = (name, count) => tweets.getTweets(name, count);
