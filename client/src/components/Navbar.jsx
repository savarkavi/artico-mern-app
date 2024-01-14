import { useContext, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { UilSearch, UilPen } from "@iconscout/react-unicons";
import { Link, Outlet } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";
import { UserContext } from "../App";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [userNavigationVisible, setUserNavigationVisible] = useState(false);
  const profileRef = useRef(null);

  const { userAuth } = useContext(UserContext);

  const handleSearchVisible = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleUserNavigationVisible = () => {
    setUserNavigationVisible((prev) => !prev);
  };

  return (
    <>
      <nav className="sticky top-0 bg-zinc-950">
        <div className="py-6 px-10 border-b flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src={logo} className="w-8 h-8" />
            </Link>
            <NavbarSearch />
          </div>
          <div className="flex items-center gap-4">
            <div
              className="p-2 rounded-full bg-zinc-800 cursor-pointer md:hidden"
              onClick={handleSearchVisible}
            >
              <UilSearch className="text-white w-5 h-5" />
            </div>
            <Link
              to={userAuth ? "/writeblog" : "/signin"}
              className="hidden md:block"
            >
              <div className="flex items-center gap-2 py-2 px-4 bg-zinc-800 rounded-full">
                <UilPen className="text-white w-4 h-4" />
                <span className="text-white text-sm">Write</span>
              </div>
            </Link>

            {userAuth && (
              <div className="relative">
                <img
                  src={userAuth.profileImg}
                  alt="profile"
                  className="w-9 h-9 rounded-full cursor-pointer object-cover"
                  onClick={handleUserNavigationVisible}
                  ref={profileRef}
                />
                <UserNavigation
                  userNavigationVisible={userNavigationVisible}
                  setUserNavigationVisible={setUserNavigationVisible}
                  profileRef={profileRef}
                />
              </div>
            )}
            {!userAuth && (
              <Link to="/signin">
                <button className="py-2 px-4 bg-white text-black rounded-full text-sm font-bold">
                  Sign In
                </button>
              </Link>
            )}
            {!userAuth && (
              <Link to="/signup" className="hidden md:block">
                <button className="py-2 px-4 bg-white text-black rounded-full text-sm font-bold">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
        <NavbarSearch searchVisible={searchVisible} isSmallScreen={true} />
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
