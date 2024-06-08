import axiosInstance from ".";

export const deleteAddonsInBatch = (truckId: string) =>
  axiosInstance.delete(`/addons/batch/${truckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getTruckAddons = (truckId: string) =>
  axiosInstance.get(`/addons/${truckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addAddOnInTruck = (formValues: {
  addonName: string;
  addonPrice: string;
  available: boolean;
  truckId: string;
}) =>
  axiosInstance.post(
    `/addons`,
    {
      ...formValues,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const updateAddOnInTruck = (formValues: {
  addonName: string;
  addonPrice: string;
  available: boolean;
  docId: string;
}) =>
  axiosInstance.put(
    `/addons`,
    {
      ...formValues,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const removeAddonFromTruck = (addonId: string) =>
  axiosInstance.delete(`/addons/${addonId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
