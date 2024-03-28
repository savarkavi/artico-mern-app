/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UilBars } from "@iconscout/react-unicons";
import { useContext } from "react";
import { EditorContext } from "../pages/WriteBlog";
import axios from "axios";
import { UserContext } from "../App";
import toast from "react-hot-toast";

const EditorNavbar = ({ title, handleMetadataVisible }) => {
  const { blog } = useContext(EditorContext);
  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePublish = async () => {
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/write/publish`, blog, {
        headers: { Authorization: `Bearer ${userAuth.access_token}` },
      })
      .then((response) => {
        toast.success(response.data);
        sessionStorage.removeItem("blogData");
        navigate("/");
      })
      .catch(({ response }) =>
        toast.error(JSON.stringify(response.data.error))
      );
  };

  return (
    <div className="sticky top-0 p-6 z-[999] bg-zinc-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logo} className="w-8 h-8" />
          </Link>
          <p className="text-white text-lg hidden sm:block">
            {title ? title : "Untitled"}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="bg-white text-sm sm:text-base text-black p-2 w-24 sm:w-28 rounded-full font-semibold"
            onClick={handlePublish}
          >
            Publish
          </button>

          <div className="text-white flex justify-end xl:hidden">
            <UilBars
              className="cursor-pointer"
              onClick={handleMetadataVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorNavbar;
