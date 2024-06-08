import axiosInstance from ".";

export const addMenuItemInTruck = async (formValues: {
  name: string;
  price: string;
  description: string;
  ingredients: string;
  category: string;
  truckId: string;
  basicPackageName: string;
  basicPackagePrice: string;
  comboDealPackageName: string;
  comboDealPackagePrice: string;
  available: boolean;
  foodItemImg: string;
}) =>
  await axiosInstance.post(
    "/menu-items",
    {
      ...formValues,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const getTruckMenuItems = async (truckId: string) =>
  await axiosInstance.get(`/menu-items/${truckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateMenuItemInTruck = async (formValues: {
  docId: string;
  name: string;
  price: string;
  description: string;
  ingredients: string;
  category: string;
  basicPackageName: string;
  basicPackagePrice: string;
  comboDealPackageName: string;
  comboDealPackagePrice: string;
  available: boolean;
  foodItemImg: string;
}) =>
  await axiosInstance.put(
    "/menu-items",
    { ...formValues },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

// Function to delete menu items of a specific truck in batch
export const deleteMenuItemsInBatch = async (truckId: string) =>
  await axiosInstance.delete(`/menu-items/batch/${truckId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Function to delete a specific menu item
export const removeMenuItemFromTruck = async (menuItemId: string) =>
  await axiosInstance.delete(`/menu-items/${menuItemId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Function to get details of a specific menu item
export const getMenuItemDetail = async (menuItemId: string) =>
  await axiosInstance.get(`/menu-items/detail/${menuItemId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
