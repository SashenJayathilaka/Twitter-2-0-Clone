import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import { auth } from "../firebase/firebase";
import { Tweet, TweetBody } from "../typings";
import { fetchTweet } from "../utils/fetchTweet";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxOpen(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: user?.displayName!,
      profileImg: user?.photoURL!,
      image: image,
    };
    const result = await fetch(`api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweet();
    setTweets(newTweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    postTweet();

    setInput("");
    setImage("");
    setImageUrlBoxOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex space-x-2 p-5"
    >
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={user?.photoURL!}
        alt=""
      />
      <div className="flex flex-1 item-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's Happening"
            className="h-24 w-full text-xl outline-none placeholder:text-xl dark:bg-[#15202b]"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                className="h-5 w-5 cursor-pointer
              transition-transform duration-150 ease-out
              hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white
              disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4"
            >
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                placeholder="Enter Image Url"
                type="text"
              />
              <button onClick={addImageTweet} className="font-bold text-white">
                Add Image
              </button>
            </motion.div>
          )}
          {image && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <img
                className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                src={image}
                alt="image/tweet"
              />
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
}

export default TweetBox;
