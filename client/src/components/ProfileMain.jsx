/* eslint-disable react/prop-types */
import ProfileBlogsPublished from "./ProfileBlogsPublished";
import ProfileInfo from "./ProfileInfo";

const ProfileMain = ({ profileActiveNavigation, user }) => {
  return (
    <div className="flex flex-col justify-between px-8 max-w-[1024px] mx-auto">
      {profileActiveNavigation === "blogs" ? (
        <ProfileBlogsPublished user={user} />
      ) : (
        <ProfileInfo user={user} />
      )}
    </div>
  );
};

export default ProfileMain;
