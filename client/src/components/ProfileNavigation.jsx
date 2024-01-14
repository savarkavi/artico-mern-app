/* eslint-disable react/prop-types */
const ProfileNavigation = ({
  profileActiveNavigation,
  setProfileActiveNavigation,
}) => {
  return (
    <div className="px-2 mt-4 flex gap-2 text-white border-b border-gray-500 max-w-[1024px] mx-auto">
      <div
        className={`${
          profileActiveNavigation === "blogs" && "border-b"
        } p-4 cursor-pointer text-sm xl:text-lg`}
        onClick={() => setProfileActiveNavigation("blogs")}
      >
        Blogs Published
      </div>
      <div
        className={`${
          profileActiveNavigation === "accountInfo" && "border-b"
        } p-4 cursor-pointer text-sm xl:hidden`}
        onClick={() => setProfileActiveNavigation("accountInfo")}
      >
        Account Info
      </div>
    </div>
  );
};

export default ProfileNavigation;
