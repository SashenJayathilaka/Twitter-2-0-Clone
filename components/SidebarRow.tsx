import { useRouter } from "next/router";
import React, { SVGProps } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
  isShow?: boolean;
  isHome?: boolean;
}

function SidebarRow({ Icon, title, onClick, isShow, isHome }: Props) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleSignIn = () => {
    if (isHome) {
      router.push("/auth/signin");
    } else {
      router.back();
    }
  };

  return (
    <>
      {isShow ? (
        <div
          className="group flex max-w-fit  bg-blue-100
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3
      transition-all duration-200 hover:bg-blue-200"
        >
          <Icon className="h-6 w-6 " />
          <p className="hidden group-hover:text-twitter md:inline-flex text-base font-light">
            {title}
          </p>
        </div>
      ) : (
        <div
          onClick={title === "Sign Out" ? handleSignOut : handleSignIn}
          className={
            title === "Sign In"
              ? `group flex max-w-fit 
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3
      transition-all duration-200 animate-pulse text-blue-500 hover:bg-blue-100`
              : `group flex max-w-fit 
      cursor-pointer items-center space-x-2 rounded-full px-4 py-3
      transition-all duration-200 hover:bg-gray-100`
          }
        >
          <Icon className="h-6 w-6 " />
          <p className="hidden group-hover:text-twitter md:inline-flex text-base font-light">
            {title}
          </p>
        </div>
      )}
    </>
  );
}

export default SidebarRow;
