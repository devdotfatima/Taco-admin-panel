import axiosInstance from "."; // Ensure axiosInstance is properly configured in your project
import { UserRoleT, UserT } from "../utils/types";

// Add a new user to the database
export const addUser = async (formValues: UserT) =>
  axiosInstance.post(
    "/users",
    { ...formValues },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Get users by role (and optionally by truckOwnerId)
export const getUsers = async (userRole: string, truckOwnerId?: string) =>
  axiosInstance.get("/users", {
    params: { userRole, truckOwnerId },
    headers: {
      "Content-Type": "application/json",
    },
  });

// Remove a truck owner user by userId
export const removeTruckOwnerUser = async (
  userId: string,
  userRole?: UserRoleT
) => {
  // Construct the query string if userRole is provided
  const queryParams = userRole
    ? `?userRole=${encodeURIComponent(userRole)}`
    : "";

  return axiosInstance.delete(`/users/truckOwner/${userId}${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Get total number of users by role
export const getTotalNumberOfUsersByRole = async (userRole: string) =>
  axiosInstance.get(`/users/total/${userRole}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Get user details by userId
export const getUser = async (userId: string) =>
  axiosInstance.get(`/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateUser = async (userId: string, userDetails: UserT) =>
  axiosInstance.put(`/users/${userId}`, userDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
