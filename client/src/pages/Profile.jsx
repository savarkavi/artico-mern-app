import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileNavigation from "../components/ProfileNavigation";
import ProfileMain from "../components/ProfileMain";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
  const { username } = useParams();
  const [profileActiveNavigation, setProfileActiveNavigation] =
    useState("blogs");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/user-profile`,
        { username }
      );

      setUser(data);
    };

    fetchUserProfile();
  }, [username]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setProfileActiveNavigation("blogs");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full xl:flex min-h-screen">
      <div className="flex-[80%] border-r border-gray-500">
        <ProfileNavigation
          profileActiveNavigation={profileActiveNavigation}
          setProfileActiveNavigation={setProfileActiveNavigation}
        />
        <ProfileMain
          profileActiveNavigation={profileActiveNavigation}
          user={user}
        />
      </div>
      <div className="flex-[20%] hidden xl:block">
        <h3 className="text-white text-xl p-8">Account Info:</h3>
        <ProfileInfo user={user} />
      </div>
    </div>
  );
};

export default Profile;
