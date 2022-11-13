import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { faker } from "@faker-js/faker";
import { shuffle } from "lodash";

import { auth } from "../../firebase/firebase";

const years = [
  "2011",
  "2010",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
];

const bannerImage = ["nature", "technology", "photography"];

type ContentProps = {
  userPName: any;
  userPhotoUrl: any;
};

const Content: React.FC<ContentProps> = ({ userPName, userPhotoUrl }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [bannerImage, setBannerImage] = useState<any>("");
  const [userYear, setUseYear] = useState<any>("");

  useEffect(() => {
    setBannerImage(
      `https://source.unsplash.com/1600x900/?${shuffle(bannerImage).pop()}`
    );
    setUseYear(shuffle(years).pop());
  }, [userPName]);

  /*   console.log(userPName, "yo");
  console.log(user?.displayName); */

  return (
    <div>
      <div>
        <div className="flex justify-start">
          <div className="px-4 py-3 mx-2">
            <div
              className="text-2xl font-medium rounded-full text-blue-400  hover:text-blue-300 float-right cursor-pointer items-center"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </div>
          </div>
          <div className="mx-2 py-2.5">
            <h2 className="mb-0 text-xl font-bold text-gray-600 dark:text-gray-200">
              {userPName}
            </h2>
            <p className="mb-0 w-48 text-xs text-gray-400 dark:text-gray-300">
              {faker.datatype.number({ min: 10, max: 500 })} Tweets
            </p>
          </div>
        </div>

        <hr className="border-gray-800" />
      </div>
      <div>
        <div
          className="w-full bg-cover bg-no-repeat bg-center"
          style={{
            height: "200px",
            backgroundImage: `url(${bannerImage})`,
          }}
        >
          <img
            className="opacity-0 w-full h-full"
            src="https://source.unsplash.com/1600x900/?nature,photography,technology"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            <div className="flex flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <div
                  style={{ height: "9rem", width: "9rem" }}
                  className="md rounded-full relative avatar"
                >
                  <img
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative border-4 border-gray-900"
                    src={userPhotoUrl}
                    alt=""
                  />
                  <div className="absolute"></div>
                </div>
              </div>
            </div>
            {userPName === user?.displayName && (
              <div className="flex flex-col text-right">
                <button className="justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1 justify-center w-full mt-3 ml-3">
            <div>
              <h2 className="text-xl leading-6 font-bold text-gray-800 dark:text-white">
                {userPName}
              </h2>
              <p className="text-sm leading-5 font-medium text-gray-600 dark:text-gray-400">
                @{userPName}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-gray-500 leading-tight mb-2 dark:text-gray-300">
                {faker.name.jobType()} / {faker.name.jobTitle()} /
                {faker.company.name()} <br />
                Visit my website to test a working <b>Twitter Clone.</b>
              </p>
              <div className="text-gray-600 flex dark:text-gray-400">
                <span className="flex mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-black dark:text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>

                  <a
                    href="https://ricardoribeirodev.com/personal/"
                    target="#"
                    className="leading-5 ml-1 text-blue-400"
                  >
                    {faker.internet.domainName()}
                  </a>
                </span>
                <span className="flex mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-black dark:text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>

                  <span className="leading-5 ml-1">
                    Joined {faker.date.month()}, {userYear}
                  </span>
                </span>
              </div>
            </div>
            <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 dark:divide-gray-400 divide-solid">
              <div className="text-center pr-3">
                <span className="font-bold text-gray-600 dark:text-gray-200">
                  {faker.datatype.number({ min: 10, max: 500 })}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  Following
                </span>
              </div>
              <div className="text-center px-3">
                <span className="font-bold text-gray-600 dark:text-gray-200">
                  {faker.datatype.number({ min: 10, max: 500 })}{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  Followers
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-800" />
      </div>
    </div>
  );
};
export default Content;
