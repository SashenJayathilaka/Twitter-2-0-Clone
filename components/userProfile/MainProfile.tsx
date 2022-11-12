import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";

import { auth } from "../../firebase/firebase";
import { Tweet } from "../../typings";
import TweetComponents from "../Tweet";
import UserHeader from "./UserHeader";

type MainProfileProps = {
  tweets: Tweet[];
};

const MainProfile: React.FC<MainProfileProps> = ({ tweets: tweetProp }) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetProp);
  const [userPName, setUserPName] = useState();
  const [userPhotoUrl, setUserPhotoUrl] = useState();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { userName } = router.query;

  /* 
  console.log(userName); */

  return (
    <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5">
      <Toaster />
      {/*       <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefFunction}
          className="h-8 w-8 cursor-pointer text-twitter
        mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div> */}
      <div>
        {user && (
          <UserHeader userPName={userPName} userPhotoUrl={userPhotoUrl} />
        )}
      </div>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet._id}>
            {tweet.username === userName && (
              <TweetComponents
                tweet={tweet}
                setUserPName={setUserPName}
                userName={userName}
                setUserPhotoUrl={setUserPhotoUrl}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainProfile;
