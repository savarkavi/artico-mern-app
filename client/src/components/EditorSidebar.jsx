import { useContext, useState } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import toast from "react-hot-toast";
import { EditorContext } from "../pages/WriteBlog";

const Publish = () => {
  const [tagInputValue, setTagInputValue] = useState("");

  const {
    blog,
    blog: { title, tags, desc, authorName },
    setBlog,
  } = useContext(EditorContext);

  const handleTagInputChange = (e) => {
    setTagInputValue(e.target.value);
  };

  const handleTagsSubmission = (e) => {
    e.preventDefault();

    if (tags.length > 4) {
      return toast.error("Maximun 5 tags are allowed");
    }

    setBlog({ ...blog, tags: [...tags, tagInputValue.toLowerCase()] });
    setTagInputValue("");
  };

  const handleRemoveTags = (i) => {
    const newTags = tags.filter((tag, idx) => idx !== i);
    setBlog({ ...blog, tags: newTags });
  };

  const handleAuthorInputChange = (e) => {
    setBlog({ ...blog, authorName: e.target.value });
  };

  const handleTitleInputChange = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

  const handleDescInputChange = (e) => {
    setBlog({ ...blog, desc: e.target.value });
  };

  return (
    <div className="h-[calc(100vh-88px)] bg-zinc-900 border rounded-lg sticky top-[88px] p-4">
      <div className="flex flex-col gap-12 h-full">
        <div className="flex flex-col gap-4">
          <label className="text-xl text-white font-semibold">
            Blog Author:
          </label>
          <input
            type="text"
            className="p-2 w-full border border-black bg-stone-700 outline-none rounded-lg text-white"
            value={authorName}
            onChange={handleAuthorInputChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-xl text-white font-semibold">
            Blog Title:
          </label>
          <input
            type="text"
            className="p-2 w-full border border-black bg-stone-700 outline-none rounded-lg text-white"
            value={title}
            onChange={handleTitleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-xl text-white font-semibold">
            Blog Description:
          </label>
          <textarea
            type="text"
            className="p-2 w-full h-[200px] border border-black bg-stone-700  outline-none rounded-lg text-white"
            value={desc}
            onChange={handleDescInputChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-xl text-white font-semibold">
            Tags/Topics:
          </label>
          <form onSubmit={handleTagsSubmission}>
            <input
              type="text"
              className="p-2 w-full border border-black outline-none bg-stone-700  rounded-lg text-white"
              onChange={(e) => handleTagInputChange(e)}
              value={tagInputValue}
            />
          </form>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <div
                className="bg-black py-2 px-3 rounded-xl flex gap-2 items-center"
                key={i}
              >
                <div className="text-white">{tag}</div>
                <UilTimes
                  className="text-white w-6 h-6 cursor-pointer"
                  onClick={() => handleRemoveTags(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
