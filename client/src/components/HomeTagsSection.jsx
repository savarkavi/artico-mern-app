/* eslint-disable react/prop-types */
const tags = [
  "Tech",
  "Coding",
  "Web",
  "Lifestyle",
  "Philosophy",
  "Psychology",
  "Science",
  "A.I",
  "Cooking",
];

const HomeTagsSection = ({
  activeCategory,
  setActiveCategory,
  setActiveNavigation,
}) => {
  const handleActiveCategory = (e) => {
    if (activeCategory === e.target.innerText) {
      setActiveNavigation("home");
      setActiveCategory(null);
      return;
    }

    const category = e.target.innerText;
    console.log(category);
    setActiveCategory(category);
    setActiveNavigation("filtered");
  };

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-xl text-white font-semibold">
        Read blogs of different Topics and Intrests
      </h2>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag, i) => {
          return (
            <div
              key={i}
              className={`py-2 px-4 text-sm rounded-full cursor-pointer text-black ${
                activeCategory === tag ? "bg-yellow-500" : "bg-zinc-400"
              }`}
              onClick={handleActiveCategory}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeTagsSection;
