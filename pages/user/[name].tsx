import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";

import MainProfile from "../../components/userProfile/MainProfile";
import SideBar from "../../components/SideBar";
import Widgets from "../../components/Widgets";
import { fetchTweet } from "../../utils/fetchTweet";
import { Tweet } from "../../typings";

interface Props {
  tweets: Tweet[];
}

const UserProfule = ({ tweets }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="dark:bg-[#15202b] h-screen overflow-hidden"
    >
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Twitter 2.0</title>
          <meta name="description" content="Generated by create next app" />
          <link
            rel="icon"
            href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={true} isHome={false} />
          <MainProfile tweets={tweets} />
          <Widgets />
        </main>
      </div>
    </motion.div>
  );
};

export default UserProfule;

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweet();

  return {
    props: {
      tweets,
    },
  };
};
