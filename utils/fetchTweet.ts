import { Tweet } from "../typings";

export const fetchTweet = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);

  const data = await res.json();
  const tweet: Tweet[] = data.tweets;

  return tweet;
};
