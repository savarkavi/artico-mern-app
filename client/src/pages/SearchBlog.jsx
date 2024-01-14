import { useEffect, useState } from "react";
import SearchNavigation from "../components/SearchNavigation";
import { useParams } from "react-router-dom";
import SearchMain from "../components/SearchMain";
import AccountsMatched from "../components/AccountsMatched";

const SearchBlog = () => {
  const { query } = useParams();
  const [activeSearchNavigation, setActiveSearchNavigation] =
    useState("search");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setActiveSearchNavigation("search");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-full xl:flex min-h-screen">
      <div className="flex-[80%] border-r border-gray-500">
        <SearchNavigation
          activeSearchNavigation={activeSearchNavigation}
          setActiveSearchNavigation={setActiveSearchNavigation}
          query={query}
        />
        <SearchMain
          query={query}
          activeSearchNavigation={activeSearchNavigation}
        />
      </div>
      <div className="flex-[20%] hidden xl:block">
        <AccountsMatched query={query} />
      </div>
    </div>
  );
};

export default SearchBlog;
