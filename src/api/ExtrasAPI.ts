import axiosInstance from ".";

export const deleteExtrasInBatch = (truckId: string) =>
  axiosInstance.delete(`/extras/batch/${truckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getTruckExtras = (truckId: string) =>
  axiosInstance.get(`/extras/${truckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addExtrasItemInTruck = (formValues: {
  extraFoodName: string;
  extraFoodPrice: string;
  available: boolean;
  truckId: string;
}) =>
  axiosInstance.post(
    `/extras`,
    {
      ...formValues,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const updateExtrasItemInTruck = (formValues: {
  extraFoodName: string;
  extraFoodPrice: string;
  available: boolean;
  docId: string;
}) =>
  axiosInstance.put(
    `/extras`,
    {
      ...formValues,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const removeExtraFromTruck = (extraId: string) =>
  axiosInstance.delete(`/extras/${extraId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
