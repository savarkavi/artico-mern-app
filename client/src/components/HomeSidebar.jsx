/* eslint-disable react/prop-types */
import HomeTagsSection from "./HomeTagsSection";
import TrendingBlogs from "./TrendingBlogs";

const HomeSidebar = ({
  activeCategory,
  setActiveCategory,
  setActiveNavigation,
}) => {
  return (
    <div className="hidden mt-8 xl:flex flex-col gap-8">
      <HomeTagsSection
        setActiveNavigation={setActiveNavigation}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-white text-xl font-semibold">Trending</h2>
        <TrendingBlogs sidebar={true} />
      </div>
    </div>
  );
};

export default HomeSidebar;
