import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetBox from "./TweetBox";
import { Tweet } from "../typings";
import TweetComponents from "../components/Tweet";
import { fetchTweet } from "../utils/fetchTweet";
import toast, { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetProp);
  const [user] = useAuthState(auth);

  const handleRefFunction = async () => {
    const refreshTost = toast.loading("Refreshing...");

    const tweet = await fetchTweet();
    setTweets(tweet);

    toast.success("Feed Updated!", {
      id: refreshTost,
    });
  };
  return (
    <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefFunction}
          className="h-8 w-8 cursor-pointer text-twitter
        mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div>{user && <TweetBox setTweets={setTweets} />}</div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponents key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
