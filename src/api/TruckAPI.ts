import axiosInstance from ".";

export const getTrucksByTruckOwner = (truckOwnerId: string) =>
  axiosInstance.get(`/trucks/owner/${truckOwnerId}`);

export const getTrucks = () => axiosInstance.get("/trucks");

export const addTruck = (formValues: {
  truckName: string;
  truckOwnerId: string;
  truckAddress: string;
  truckSupervisorId?: string;
}) => axiosInstance.post("/trucks", { ...formValues });

export const updateTruck = (
  truckId: string,
  formValues: {
    truckName: string;
    truckAddress: string;
    truckSupervisorId?: string;
    truckId: string;
  }
) => axiosInstance.put(`/trucks/${truckId}`, { ...formValues });

export const getTruckDetails = (truckId: string) =>
  axiosInstance.get(`/trucks/${truckId}`);

export const removeTruck = (truckId: string) =>
  axiosInstance.delete(`/trucks/${truckId}`);

export const getTotalNumberOfTrucks = () => axiosInstance.get(`/trucks/total`);
