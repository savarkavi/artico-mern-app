import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { storeInSession } from "../common/sessions";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Settings = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    github: "",
    website: "",
  });

  console.log(newUsername);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append("photo", profilePicture);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userAuth.access_token}`,
      },
    };

    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/update-profile-img`,
      formData,
      config
    );

    storeInSession(
      "user",
      JSON.stringify({ ...userAuth, profileImg: result.data.url })
    );

    location.reload();

    console.log(result);
  };

  const handleFormUpload = async (e) => {
    e.preventDefault();

    if (newUsername.length === 0) {
      toast.error("You have to provide a Username");
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/update-profile`,
      { newUsername, newBio, socialLinks },
      { headers: { Authorization: `Bearer ${userAuth.access_token}` } }
    );

    storeInSession(
      "user",
      JSON.stringify({ ...userAuth, username: data?.profile_info.username })
    );

    setUserAuth({ ...userAuth, username: data?.profile_info.username });

    console.log(data);
  };

  useEffect(() => {
    if (userAuth) {
      const fetchCurrentUser = async () => {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/user-profile`,
          { username: userAuth.username }
        );
        setCurrentUser(data);
        setNewUsername(data?.profile_info.username);
        setNewBio(data?.profile_info.bio);
        setSocialLinks(data?.social_links);
      };

      fetchCurrentUser();
    }
  }, [userAuth]);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleSocialsChange = (e, social) => {
    setSocialLinks({ ...socialLinks, [social]: e.target.value });
  };

  console.log(currentUser);
  console.log(socialLinks);

  return (
    <div className="flex flex-col gap-12 justify-center p-8 max-w-[800px] mx-auto">
      <div className="flex flex-col items-center gap-6">
        <label htmlFor="profile_picture" className="cursor-pointer">
          <img
            src={
              imagePreview
                ? imagePreview
                : currentUser?.profile_info.profile_img
            }
            className={`w-28 h-28 xl:w-36 xl:h-36 rounded-full object-cover`}
          />
          <input
            id="profile_picture"
            type="file"
            className="hidden rounded-full"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
        </label>
        <button
          className="bg-white px-4 py-2 rounded-lg"
          onClick={handleImageUpload}
        >
          Upload
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border bg-stone-700 text-gray-400 p-2 w-full cursor-not-allowed">
          {currentUser?.profile_info.fullname}
        </div>
        <div className="border bg-stone-700 text-gray-400 p-2 w-full cursor-not-allowed">
          {currentUser?.profile_info.email}
        </div>
      </div>
      <form className="flex flex-col gap-8" onSubmit={handleFormUpload}>
        <div className="flex flex-col gap-4">
          <p className="text-white text-sm">
            This username will be visible to all the users
          </p>
          <input
            className="border bg-stone-700 text-white p-2 w-full outline-none"
            value={newUsername}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white text-sm">Change your bio</p>
          <textarea
            className="border bg-stone-700 text-white p-2 w-full h-[200px] outline-none"
            value={newBio}
            onChange={handleBioChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white text-sm">Add your socials</p>
          <div className="relative">
            <input
              className="border bg-stone-700 text-white p-2 w-full outline-none px-8"
              value={socialLinks.facebook}
              onChange={(e) => handleSocialsChange(e, "facebook")}
            />
            <FaFacebook className="absolute left-2 top-1/2 -translate-y-1/2 text-white" />
          </div>
          <div className="relative">
            <input
              className="border bg-stone-700 text-white p-2 w-full outline-none px-8"
              value={socialLinks.twitter}
              onChange={(e) => handleSocialsChange(e, "twitter")}
            />
            <FaTwitter className="absolute left-2 top-1/2 -translate-y-1/2 text-white" />
          </div>
          <div className="relative">
            <input
              className="border bg-stone-700 text-white p-2 w-full outline-none px-8"
              value={socialLinks.instagram}
              onChange={(e) => handleSocialsChange(e, "instagram")}
            />
            <FaInstagram
              className="absolute left-2 top-1/2 -translate-y-1/2
            text-white"
            />
          </div>
          <div className="relative">
            <input
              className="border bg-stone-700 text-white p-2 w-full outline-none px-8"
              value={socialLinks.youtube}
              onChange={(e) => handleSocialsChange(e, "youtube")}
            />
            <FaYoutube className="absolute left-2 top-1/2 -translate-y-1/2 text-white" />
          </div>
          <div className="relative">
            <input
              className="border bg-stone-700 text-white p-2 w-full outline-none px-8"
              value={socialLinks.website}
              onChange={(e) => handleSocialsChange(e, "website")}
            />
            <FaGlobe className="absolute left-2 top-1/2 -translate-y-1/2 text-white" />
          </div>
        </div>
        <button className="bg-white px-4 py-2 rounded-lg">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
