import React from "react";

import Content from "./Content";

type UserHeaderProps = {
  userPName: any;
  userPhotoUrl: any;
};

const UserHeader: React.FC<UserHeaderProps> = ({ userPName, userPhotoUrl }) => {
  return (
    <>
      <div className="absolute left-[6%]" style={{ bottom: "2rem" }}>
        <div className="flex-shrink-0 flex hover:bg-gray-200 rounded-full px-6 cursor-pointer py-3 mt-12 mr-2 dark:hover:bg-gray-800">
          <div className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={userPhotoUrl}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-base leading-6 font-medium text-gray-400">
                  {userPName}
                </p>
                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{userPName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Content userPhotoUrl={userPhotoUrl} userPName={userPName} />
    </>
  );
};
export default UserHeader;
