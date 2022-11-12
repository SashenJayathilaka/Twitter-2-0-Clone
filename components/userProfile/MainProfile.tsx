import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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
    <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
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
                pushNote={false}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainProfile;
