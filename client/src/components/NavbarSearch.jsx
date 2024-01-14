/* eslint-disable react/prop-types */

import { UilSearch } from "@iconscout/react-unicons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarSearch = ({ searchVisible, isSmallScreen = false }) => {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`search/${searchInput}`);
    setSearchInput("");
  };

  return (
    <form
      className={`
        ${
          isSmallScreen
            ? `p-4 md:hidden ${searchVisible ? "block" : "hidden"}`
            : "hidden md:block"
        }
         relative
      `}
      onSubmit={handleSearchSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="py-2 px-4 w-full bg-stone-800 rounded-full outline-none text-white"
        value={searchInput}
        onChange={handleSearchInput}
      />
      <div>
        <UilSearch
          className={`text-white absolute ${
            isSmallScreen ? "right-8" : "right-4"
          } top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer`}
        />
      </div>
    </form>
  );
};

export default NavbarSearch;
