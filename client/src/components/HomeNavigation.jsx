/* eslint-disable react/prop-types */

const HomeNavigation = ({
  activeNavigation,
  setActiveNavigation,
  activeCategory,
}) => {
  return (
    <div className="px-8 max-w-[1024px] mx-auto mt-4 flex gap-8 text-white border-b border-gray-500">
      <div
        className={`${
          (activeNavigation === "home" || activeNavigation === "filtered") &&
          "border-b"
        } p-4 cursor-pointer xl:text-lg`}
        onClick={() => setActiveNavigation("home")}
      >
        {activeCategory ? activeCategory : "Home"}
      </div>
      <div
        className={`${
          activeNavigation === "trending" && "border-b"
        } p-4 cursor-pointer xl:hidden`}
        onClick={() => setActiveNavigation("trending")}
      >
        Trending Blogs
      </div>
    </div>
  );
};

export default HomeNavigation;
