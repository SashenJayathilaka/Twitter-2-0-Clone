import {
  ChatAltIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";
import { Comment, CommentBody, Tweet } from "../typings";

import { auth } from "../firebase/firebase";
import { fetchComments } from "../utils/fetchComments";

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>("");
  const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false);

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: user?.displayName!,
      profileImg: user?.photoURL!,
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    console.log("we made it", result);
    toast.success("Comment Posted!", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxOpen(false);
    refreshComments();
  };

  /*   const handleSignIn = async () => {
    router.push("/auth/signin");
  }; */

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5 hover:shadow-lg">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover "
          src={tweet.profileImg}
          alt={tweet.username}
        />
        <div>
          <div className="flex item-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "")}.
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt="img/tweet"
              className="m-5 ml-0 max-h-60
          rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCommentBoxOpen(!commentBoxOpen)}
          className="flex cursor-pointer item-center space-x-3 text-gray-400"
        >
          <ChatAltIcon className="h-5 w-5" />
          <p className="text-center">{comments.length}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex cursor-pointer item-center space-x-3 text-gray-400"
        >
          <SwitchHorizontalIcon className="h-5 w-5" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex cursor-pointer item-center space-x-3 text-gray-400"
        >
          <HeartIcon className="h-5 w-5" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex cursor-pointer item-center space-x-3 text-gray-400"
        >
          <UploadIcon className="h-5 w-5" />
        </motion.div>
      </div>

      {commentBoxOpen && (
        <>
          {user ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <form className="mt-3 flex space-x-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
                  type="text"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input}
                  type="submit"
                  className="text-twitter  disabled:text-gray-200"
                >
                  Post
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="flex text-red-500 justify-center m-auto font-semibold">
              <p>You Need To Sign IN</p>
            </div>
          )}
        </>
      )}
      {commentBoxOpen && (
        <>
          {comments?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-thin scrollbar-thumb-blue-100"
            >
              {comments.map((comment) => (
                <div key={comment._id} className="flex space-x-2">
                  <hr className="top-10 h-8 border-x border-twitter/30" />
                  <img
                    src={comment.profileImg}
                    className="mt-2 h-7 w-7 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center space-x-l">
                      <p className="mr-1 font-bold">{comment.username}</p>
                      <p className="hidden text-sm text-gray-500 lg:inline">
                        @{comment.username.replace(/\s+/g, "")}.
                      </p>
                      <TimeAgo
                        className="text-sm text-gray-500"
                        date={comment._createdAt}
                      />
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
