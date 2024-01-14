/* eslint-disable react/prop-types */
import { useState } from "react";
import FilteredBlogs from "./FilteredBlogs";
import AccountsMatched from "./AccountsMatched";

const SearchMain = ({ query, activeSearchNavigation }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col justify-between px-8 max-w-[1024px] mx-auto">
      {activeSearchNavigation === "search" ? (
        <FilteredBlogs
          activeCategory={query}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <AccountsMatched query={query} />
      )}
    </div>
  );
};

export default SearchMain;
