/* eslint-disable react/prop-types */

import { useState } from "react";
import FilteredBlogs from "./FilteredBlogs";
import LatestBlogs from "./LatestBlogs";
import TrendingBlogs from "./TrendingBlogs";
const HomeMain = ({ activeNavigation, activeCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col justify-between px-8 max-w-[1024px] mx-auto">
      {activeNavigation === "home" ? (
        <LatestBlogs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : activeNavigation === "filtered" ? (
        <FilteredBlogs
          activeCategory={activeCategory}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <TrendingBlogs />
      )}
    </div>
  );
};

export default HomeMain;
