/* eslint-disable react/prop-types */
import { UilPen, UilUser, UilSetting } from "@iconscout/react-unicons";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/sessions";
import { Link } from "react-router-dom";

const UserNavigation = ({
  userNavigationVisible,
  setUserNavigationVisible,
  profileRef,
}) => {
  const { userAuth, setUserAuth } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!profileRef.current) {
        return;
      }

      if (!profileRef.current.contains(e.target)) {
        setUserNavigationVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileRef, setUserNavigationVisible]);

  const handleSignOut = () => {
    removeFromSession("user");
    removeFromSession("blogData");
    removeFromSession("likedComments");
    removeFromSession("dislikedComments");
    setUserAuth(null);
    location.reload();
  };

  return (
    <div
      className={`${
        userNavigationVisible ? "block" : "hidden"
      } absolute border right-0 top-12 flex flex-col bg-stone-900 text-white w-[200px]`}
    >
      <Link
        to="/writeblog"
        className="flex items-center gap-2 p-4 cursor-pointer hover:bg-white hover:text-black transition-all"
      >
        <UilPen />
        <span>Write</span>
      </Link>
      <Link
        to={`/profile/${userAuth.username}`}
        className="flex items-center gap-2 p-4 cursor-pointer hover:bg-white hover:text-black transition-all"
      >
        <UilUser />
        <span>Profile</span>
      </Link>
      <Link
        to="/settings"
        className="flex items-center gap-2 p-4 cursor-pointer hover:bg-white hover:text-black transition-all"
      >
        <UilSetting />
        <span>Settings</span>
      </Link>
      <div
        className="p-4 border-t font-bold cursor-pointer hover:bg-white hover:text-black transition-all"
        onClick={handleSignOut}
      >
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default UserNavigation;
