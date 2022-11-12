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
            <h2 className="mb-0 text-xl font-bold text-gray-600">
              {userPName}
            </h2>
            <p className="mb-0 w-48 text-xs text-gray-400">
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
              <h2 className="text-xl leading-6 font-bold text-gray-800">
                {userPName}
              </h2>
              <p className="text-sm leading-5 font-medium text-gray-600">
                @{userPName}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-gray-500 leading-tight mb-2">
                {faker.name.jobType()} / {faker.name.jobTitle()} /
                {faker.company.companyName()} <br />
                Visit my website to test a working <b>Twitter Clone.</b>
              </p>
              <div className="text-gray-600 flex">
                <span className="flex mr-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon">
                    <g>
                      <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                      <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                    </g>
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
                  <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon">
                    <g>
                      <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                      <circle cx="7.032" cy="8.75" r="1.285"></circle>
                      <circle cx="7.032" cy="13.156" r="1.285"></circle>
                      <circle cx="16.968" cy="8.75" r="1.285"></circle>
                      <circle cx="16.968" cy="13.156" r="1.285"></circle>
                      <circle cx="12" cy="8.75" r="1.285"></circle>
                      <circle cx="12" cy="13.156" r="1.285"></circle>
                      <circle cx="7.032" cy="17.486" r="1.285"></circle>
                      <circle cx="12" cy="17.486" r="1.285"></circle>
                    </g>
                  </svg>
                  <span className="leading-5 ml-1">
                    Joined {faker.date.month()}, {userYear}
                  </span>
                </span>
              </div>
            </div>
            <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
              <div className="text-center pr-3">
                <span className="font-bold text-gray-600">
                  {faker.datatype.number({ min: 10, max: 500 })}
                </span>
                <span className="text-gray-600"> Following</span>
              </div>
              <div className="text-center px-3">
                <span className="font-bold text-gray">
                  {faker.datatype.number({ min: 10, max: 500 })}{" "}
                </span>
                <span className="text-gray-600"> Followers</span>
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
