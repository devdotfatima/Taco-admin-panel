import {
  doc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { db, timestamp } from "../firebase/FirebaseInit";
import { COLLECTIONS } from "../utils/const";

export const addAddOnInTruck = async ({
  addonName,
  addonPrice,
  available,
  truckId,
}: {
  addonName: string;
  addonPrice: string;
  available: boolean;
  truckId: string;
}) => {
  const truckAddonsRef = doc(collection(db, COLLECTIONS.FOOD_ADDONS));

  try {
    await setDoc(truckAddonsRef, {
      addonName,
      addonPrice,
      available,
      truckId: truckId,
      docId: truckAddonsRef.id,
      date: timestamp,
    });
    return truckAddonsRef.id;
  } catch (error) {
    console.error("Error Adding extras: ", error);
    return null;
  }
};
export const getTruckAddons = async (truckId: string) => {
  try {
    const addonsRef = collection(db, COLLECTIONS.FOOD_ADDONS);
    const q = query(addonsRef, where("truckId", "==", truckId));
    const dbResults = await getDocs(q);
    let truckAddonsData: any[] = [];
    dbResults.forEach((doc) => {
      truckAddonsData.push(doc.data());
    });
    return truckAddonsData;
  } catch (error) {
    console.error("Error fetching truck addons data: ", error);
    return [];
  }
};
export const updateAddOnInTruck = async ({
  addonName,
  addonPrice,
  available,
  docId,
}: {
  addonName: string;
  addonPrice: string;
  available: boolean;
  docId: string;
}) => {
  const truckAddOnRef = doc(db, COLLECTIONS.FOOD_ADDONS, docId);
  try {
    await updateDoc(truckAddOnRef, {
      addonName,
      addonPrice,
      available,
      date: timestamp,
    });
    return true;
  } catch (error) {
    console.error("Error updating Addons: ", error);
    return false;
  }
};
export const deleteAddonsInBatch = async (truckId: string) => {
  const batch = writeBatch(db);

  const addonsRef = collection(db, COLLECTIONS.FOOD_ADDONS);
  const q = query(addonsRef, where("truckId", "==", truckId));
  const dbResults = await getDocs(q);

  dbResults.forEach((doc) => {
    batch.delete(doc.ref);
  });
  // Commit the batch
  await batch.commit();
};

export const removeAddonFromTruck = async (addonId: string) => {
  try {
    const addonRef = doc(db, COLLECTIONS.FOOD_ADDONS, addonId);
    await deleteDoc(addonRef);
    return true;
  } catch (error) {
    console.error("Error deleting menu item  data: ", error);
    return null;
  }
};
