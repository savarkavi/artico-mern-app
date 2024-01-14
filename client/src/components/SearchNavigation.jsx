/* eslint-disable react/prop-types */
const SearchNavigation = ({
  activeSearchNavigation,
  setActiveSearchNavigation,
  query,
}) => {
  return (
    <div className="px-2 mt-4 flex gap-2 text-white border-b border-gray-500 max-w-[1024px] mx-auto">
      <div
        className={`${
          activeSearchNavigation === "search" && "border-b"
        } p-4 cursor-pointer text-sm xl:text-lg`}
        onClick={() => setActiveSearchNavigation("search")}
      >
        {`Search results for "${query}"`}
      </div>
      <div
        className={`${
          activeSearchNavigation === "account" && "border-b"
        } p-4 cursor-pointer text-sm xl:hidden`}
        onClick={() => setActiveSearchNavigation("account")}
      >
        Accounts matched
      </div>
    </div>
  );
};

export default SearchNavigation;
