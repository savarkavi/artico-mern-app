/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import blogBannerPlaceholder from "../assets/blogBanner.jpg";
import axios from "axios";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import { storeInSession, getFromSession } from "../common/sessions";
import { EditorContext } from "../pages/WriteBlog";

const EditorBanner = () => {
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { userAuth } = useContext(UserContext);
  const {
    blog,
    blog: { bannerUrl },
    setBlog,
  } = useContext(EditorContext);

  useEffect(() => {
    const blogData = getFromSession("blogData");

    if (blogData) {
      setBlog(JSON.parse(blogData));
    }
  }, [setBlog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024)
        return toast.error("Image should be less than 10 MB");

      setBanner(file);
      setBlog({ ...blog, bannerUrl: "" });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const blogData = JSON.stringify({ ...blog, bannerUrl: "" });
    storeInSession("blogData", blogData);
    setBlog({ ...blog, bannerUrl: "" });
    setBanner("");
    setImagePreview("");
  };

  const handleUpload = async () => {
    if (!banner) return;

    const formData = new FormData();
    formData.append("photo", banner);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userAuth.access_token}`,
      },
    };

    setLoading(true);

    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/write/upload-img`,
        formData,
        config
      )
      .then((res) => {
        toast.success("Image successfully uploaded");
        const blogData = JSON.stringify({ ...blog, bannerUrl: res.data.url });
        storeInSession("blogData", blogData);
        setBlog(JSON.parse(blogData));
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`);
      });
  };

  return (
    <div className="w-full h-[400px] aspect-video bg-zinc-900 border flex justify-center items-center group rounded-lg">
      <label
        htmlFor="blogBanner"
        className={`text-white w-full h-full relative cursor-pointer ${
          !bannerUrl && "flex justify-center items-center"
        }`}
      >
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt="blog banner"
            className="object-cover w-full h-full overflow-hidden rounded-lg"
          />
        )}
        {!bannerUrl && (
          <div className="overflow-hidden w-full h-full flex justify-center items-center relative">
            <img
              src={imagePreview ? imagePreview : blogBannerPlaceholder}
              alt="blog banner placeholder"
              className={`${
                imagePreview
                  ? "object-cover w-full h-full overflow-hidden blur-sm"
                  : "object-contain w-24 h-24"
              } `}
            />
            {loading && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Uploading...
              </div>
            )}
          </div>
        )}
        <input
          id="blogBanner"
          type="file"
          accept=".png, .jpg, .jpeg"
          className="hidden"
          onChange={(e) => handleImageChange(e)}
        />
        {!bannerUrl && (
          <button
            className={`bg-white text-black absolute right-2 top-2 py-2 px-4 text-sm rounded-full `}
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
        {bannerUrl && (
          <div className="hidden group-hover:block" onClick={handleRemoveImage}>
            <button
              className={`bg-white text-black absolute right-2 top-2 py-2 px-4 text-xs rounded-full`}
            >
              Remove
            </button>
          </div>
        )}
      </label>
    </div>
  );
};

export default EditorBanner;
