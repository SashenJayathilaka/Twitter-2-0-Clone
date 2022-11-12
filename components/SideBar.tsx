import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { UserIcon as UserSecond } from "@heroicons/react/solid";

type SideBarProps = {
  isShow: boolean;
  isHome: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ isShow, isHome }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="col-span-2 flex flex-col item-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
        alt=""
      />
      <SidebarRow Icon={HomeIcon} title="Home" isShow={isHome} />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      {isShow ? (
        <SidebarRow
          Icon={user ? UserIcon : UserSecond}
          title="Profile"
          isShow={isShow}
        />
      ) : (
        <SidebarRow
          Icon={user ? UserIcon : UserSecond}
          title={user ? "Sign Out" : "Sign In"}
        />
      )}
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  );
};
export default SideBar;
