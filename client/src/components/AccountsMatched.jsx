/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AccountsMatched = ({ query }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/search-user`,
        { query }
      );
      console.log(data);

      setUsers(data);
    };

    fetchUsers();
  }, [query]);

  console.log(users);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-white text-lg">
        {users.length > 0
          ? "Accounts matched with your search:"
          : "No Accounts matched"}
      </h3>
      {users.map((user) => {
        return (
          <Link
            to={`/profile/${user.profile_info.username}`}
            key={user._id}
            className="flex gap-4 items-center"
          >
            <img
              src={user.profile_info.profile_img}
              alt="pp"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2 text-white text-sm font-semibold">
              <span>{user.profile_info.fullname}</span>
              <span className="text-gray-400">{`@${user.profile_info.username}`}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsMatched;
