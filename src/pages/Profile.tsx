import { faker } from "@faker-js/faker";
import Header from "../components/Header";
import { useState } from "react";
import UpdateProfileModal from "../components/UpdateProfileModal";

const Profile = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const updateProfileModalVisibility = (visible: boolean) => {
    setShowProfileModal(visible);
  };
  return (
    <>
      <Header pageTitle="PROFILE INFORMATION" />
      <div className="flex gap-5 lg:gap-0 flex-wrap mt-[40vh]">
        <div className="flex flex-col items-center justify-center h-80 border-[1px] border-gray-300  bg-white  rounded-l w-full lg:w-96">
          <img
            src={faker.image.avatar()}
            alt="profile image"
            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Jane Doe
          </h5>
          <span className="text-sm text-gray-500 mb-2 ">Admin</span>
          <span className="text-sm text-green-500 rounded-full px-8 py-1">
            Active
          </span>
        </div>
        <div className="flex flex-col  h-80 bg-white border-[1px] border-gray-300 rounded-r w-full lg:w-96 xl:w-1/3 m  py-3">
          <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 px-8">
            <h2 className="xl:text-xl font-bold text-black">
              Provider Information
            </h2>
            <button
              onClick={() => updateProfileModalVisibility(true)}
              className="bg-carrot hover:bg-carrot-100 rounded-lg text-white text-sm sm:text-medium font-medium bg-gray-250 px-4 sm:px-8 py-1"
            >
              Update
            </button>
          </div>
          <div className="px-8 pt-8 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className=" font-poppins text-gray-400 text-sm font-semibold">
                Birth Date{" "}
              </h2>
              <p>01/01/99</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" font-poppins text-gray-400 text-sm font-semibold">
                Gender Identity
              </h2>
              <p>Female</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" font-poppins text-gray-400 text-sm font-semibold">
                Phone Number
              </h2>
              <p>(123)-4567890</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" font-poppins text-gray-400 text-sm font-semibold">
                Email
              </h2>
              <p>sample@mail.com</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" font-poppins text-gray-400 text-sm font-semibold">
                Zip Code
              </h2>
              <p>445566</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" font-poppins text-gray-400 text-sm font-semibold">
                State
              </h2>
              <p>UAE</p>
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
