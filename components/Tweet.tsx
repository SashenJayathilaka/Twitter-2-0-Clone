import { faker } from "@faker-js/faker";
import { HeartIcon, UploadIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";

import { auth } from "../firebase/firebase";
import { Comment, CommentBody, Tweet } from "../typings";
import { fetchComments } from "../utils/fetchComments";

interface Props {
  tweet: Tweet;
  setUserPName?: any;
  userName?: any;
  setUserPhotoUrl?: any;
  pushNote: boolean;
}

function Tweet({
  tweet,
  setUserPName,
  userName,
  setUserPhotoUrl,
  pushNote,
}: Props) {
  const [user] = useAuthState(auth);
  const router = useRouter();
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

  const handleNavigatePage = () => {
    if (user) {
      if (pushNote) {
        router.push({
          pathname: `user/${tweet.username}`,
          query: {
            userName: tweet.username.toString(),
          },
        });
      } else return;
    } else {
      router.push("auth/signin");
    }
  };

  useEffect(() => {
    if (userName === tweet.username) {
      setUserPName(tweet.username);
      setUserPhotoUrl(tweet.profileImg);
    } else return;
  }, [tweet]);

  /*   const handleSignIn = async () => {
    router.push("/auth/signin");
  }; */

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5 hover:shadow-lg dark:border-gray-800 dark:hover:bg-gray-800">
      <div className="flex space-x-3 cursor-pointer">
        <img
          className="h-10 w-10 rounded-full object-cover "
          src={tweet.profileImg}
          alt={tweet.username}
          onClick={handleNavigatePage}
        />
        <div>
          <div className="flex item-center space-x-1">
            <p
              className={
                user?.displayName === tweet.username
                  ? `font-bold`
                  : `font-bold mr-1`
              }
              onClick={handleNavigatePage}
            >
              {tweet.username}
            </p>
            {user?.displayName === tweet.username && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-[#00ADED] mr-1 mt-auto mb-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <p
              className="hidden text-sm text-gray-500 sm:inline dark:text-gray-400"
              onClick={handleNavigatePage}
            >
              @{tweet.username.replace(/\s+/g, "")}.
            </p>
            <TimeAgo
              className="text-sm text-gray-500 dark:text-gray-400"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>

          <p className="text-center">{comments.length}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex cursor-pointer item-center space-x-3 text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>

          <p className="text-center">
            {faker.datatype.number({ min: 10, max: 500 })}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex cursor-pointer item-center space-x-3 text-gray-400"
        >
          <HeartIcon className="h-5 w-5" />
          <p className="text-center">
            {faker.datatype.number({ min: 10, max: 500 })}
          </p>
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
                  className="flex-1 rounded-lg bg-gray-100 p-2 outline-none dark:bg-gray-700"
                  type="text"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input}
                  type="submit"
                  className="text-twitter  disabled:text-gray-200 cursor-pointer"
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
