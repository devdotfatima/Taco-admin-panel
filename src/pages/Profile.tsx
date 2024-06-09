import { faker } from "@faker-js/faker";
import Header from "../components/Header";
import { useState } from "react";
import UpdateProfileModal from "../components/UserProfileModal";
import { useSelector } from "../redux/store";

const Profile = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useSelector((state) => state.app);
  const updateProfileModalVisibility = (visible: boolean) => {
    setShowProfileModal(visible);
  };
  return (
    <>
      <Header pageTitle="PROFILE INFORMATION" />
      <div className="flex gap-5 lg:gap-0 flex-wrap mt-[40vh]">
        <div className="flex flex-col items-center justify-center h-80 border-[1px] border-gray-300  bg-white  rounded-l w-full lg:w-5/12">
          <img
            src={faker.image.avatar()}
            alt="profile image"
            className="object-cover w-24 h-24 mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Jane Doe
          </h5>
          <span className="mb-2 text-sm text-gray-500 ">Admin</span>
          <span className="px-8 py-1 text-sm text-green-500 rounded-full">
            Active
          </span>
        </div>
        <div className="flex flex-col  sm:h-80 bg-white border-[1px] border-gray-300 rounded-r w-full lg:w-7/12 xl:w-1/3 m  py-3">
          <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 px-8">
            <h2 className="font-bold text-black xl:text-xl">
              Admin Information
            </h2>
            <button
              onClick={() => updateProfileModalVisibility(true)}
              className="px-4 py-1 text-sm font-medium text-white rounded-lg bg-carrot hover:bg-carrot-100 sm:text-medium bg-gray-250 sm:px-8"
            >
              Update
            </button>
          </div>
          <div className="flex flex-col justify-center h-full gap-3 px-8 pt-8">
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:flex-row sm:items-center">
              <h2 className="text-sm font-semibold text-gray-400 font-poppins">
                Birth Date{" "}
              </h2>
              <p>01/01/99</p>
            </div>
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:flex-row sm:items-center">
              <h2 className="text-sm font-semibold text-gray-400 font-poppins">
                Gender Identity
              </h2>
              <p>Female</p>
            </div>
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:flex-row sm:items-center">
              <h2 className="text-sm font-semibold text-gray-400 font-poppins">
                Phone Number
              </h2>
              <p>(123)-4567890</p>
            </div>
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:flex-row sm:items-center">
              <h2 className="text-sm font-semibold text-gray-400 font-poppins">
                Email
              </h2>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfileModal
        visible={showProfileModal}
        updateVisibility={updateProfileModalVisibility}
      />
    </>
  );
};

export default Profile;
