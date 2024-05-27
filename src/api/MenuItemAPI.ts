import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db, timestamp } from "../firebase/FirebaseInit";
import { COLLECTIONS } from "../utils/const";

export const getTruckMenuItems = async (truckId: string) => {
  try {
    const trucksRef = collection(db, COLLECTIONS.TRUCK_FOOD_MENU);
    const q = query(trucksRef, where("truckId", "==", truckId));
    const dbResults = await getDocs(q);
    let truckMenuData: any[] = [];
    dbResults.forEach((doc) => {
      truckMenuData.push(doc.data());
    });
    return truckMenuData;
  } catch (error) {
    console.error("Error fetching truck owners data: ", error);
    return [];
  }
};

export const addMenuItemInTruck = async ({
  name,
  price,
  description,
  ingredients,
  category,
  truckId,
  basicPackageName,
  basicPackagePrice,
  comboDealPackageName,
  comboDealPackagePrice,
  available,
}: {
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
}) => {
  const truckFoodMenuRef = doc(collection(db, COLLECTIONS.TRUCK_FOOD_MENU));

  try {
    await setDoc(truckFoodMenuRef, {
      categoryType: category,
      docId: truckFoodMenuRef.id,
      name: name,
      description: description,
      price: price,
      ingredients: ingredients,
      basicPackageName,
      basicPackagePrice,
      comboDealPackageName,
      comboDealPackagePrice,
      truckId: truckId,
      availability: available,
      date: timestamp,
    });
    return truckFoodMenuRef.id;
  } catch (error) {
    console.error("Error Adding truck  data: ", error);
    return null;
  }
};

export const updateMenuItemInTruck = async ({
  docId,
  name,
  price,
  description,
  ingredients,
  category,
  basicPackageName,
  basicPackagePrice,
  comboDealPackageName,
  comboDealPackagePrice,
  available,
}: {
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
}) => {
  const truckFoodMenuRef = doc(db, COLLECTIONS.TRUCK_FOOD_MENU, docId); // Reference to the specific document by ID

  try {
    await updateDoc(truckFoodMenuRef, {
      name,
      price,
      description,
      ingredients,
      categoryType: category,
      basicPackageName,
      basicPackagePrice,
      comboDealPackageName,
      comboDealPackagePrice,
      availability: available,
      date: timestamp,
    });
    return true;
  } catch (error) {
    console.error("Error updating truck data: ", error);
    return false;
  }
};

export const removeMenuItemFromTruck = async (menuItemId: string) => {
  try {
    const menuItemRef = doc(db, COLLECTIONS.TRUCK_FOOD_MENU, menuItemId);
    await deleteDoc(menuItemRef);
    return true;
  } catch (error) {
    console.error("Error deleting menu item  data: ", error);
    return null;
  }
};

export const deleteMenuItemsInBatch = async (truckId: string) => {
  const batch = writeBatch(db);

  const trucksRef = collection(db, COLLECTIONS.TRUCK_FOOD_MENU);
  const q = query(trucksRef, where("truckId", "==", truckId));
  const dbResults = await getDocs(q);

  // Update the population of 'SF'
  dbResults.forEach((doc) => {
    batch.delete(doc.ref);
  });
  // Commit the batch
  await batch.commit();
};