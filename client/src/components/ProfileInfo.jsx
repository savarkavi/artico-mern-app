/* eslint-disable react/prop-types */
import {
  UilFacebookF,
  UilInstagram,
  UilGithub,
  UilTwitter,
  UilYoutube,
  UilGlobe,
} from "@iconscout/react-unicons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getFromSession } from "../common/sessions";
import { Link } from "react-router-dom";

const ProfileInfo = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const sessionUser = JSON.parse(getFromSession("user"));
    setCurrentUser(sessionUser?.username);
  }, []);

  console.log(currentUser, user.profile_info.username);

  return (
    <div className="flex flex-col gap-6 justify-center items-center p-8 mt-4">
      <img
        src={user.profile_info.profile_img}
        alt="pp"
        className="w-28 h-28 rounded-full object-cover"
      />
      <div className="flex flex-col gap-4 items-center">
        <span className="text-white font-semibold text-lg">{`@${user.profile_info.username}`}</span>
        <span className="text-gray-300">{user.profile_info.fullname}</span>
      </div>
      <div className="flex gap-2 items-center text-gray-300">
        <span>{`${user.account_info.total_posts} Blogs`}</span>
        <span>-</span>
        <span>{`${user.account_info.total_reads} Reads`}</span>
      </div>
      <div className="flex gap-4 items-center text-gray-300 mt-8">
        <UilFacebookF />
        <UilGithub />
        <UilGlobe />
        <UilInstagram />
        <UilTwitter />
        <UilYoutube />
      </div>
      <div>
        <span className="text-gray-300">
          {`Joined at ${format(new Date(user.createdAt), "dd-MM-yy")}`}
        </span>
      </div>
      {currentUser === user.profile_info.username && (
        <Link to={`/settings`} className="bg-white py-2 px-8 rounded-lg">
          Edit Profile
        </Link>
      )}{" "}
    </div>
  );
};

export default ProfileInfo;
