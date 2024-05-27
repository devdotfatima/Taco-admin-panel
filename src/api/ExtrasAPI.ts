import {
  writeBatch,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, timestamp } from "../firebase/FirebaseInit";
import { COLLECTIONS } from "../utils/const";

export const deleteExtrasInBatch = async (truckId: string) => {
  const batch = writeBatch(db);

  const extrasRef = collection(db, COLLECTIONS.FOOD_EXTRAS);
  const q = query(extrasRef, where("truckId", "==", truckId));
  const dbResults = await getDocs(q);

  // Update the population of 'SF'
  dbResults.forEach((doc) => {
    batch.delete(doc.ref);
  });
  // Commit the batch
  await batch.commit();
};

export const getTruckExtras = async (truckId: string) => {
  try {
    const extrasRef = collection(db, COLLECTIONS.FOOD_EXTRAS);
    const q = query(extrasRef, where("truckId", "==", truckId));
    const dbResults = await getDocs(q);
    let truckExtrasData: any[] = [];
    dbResults.forEach((doc) => {
      truckExtrasData.push(doc.data());
    });
    return truckExtrasData;
  } catch (error) {
    console.error("Error fetching truck Extras data: ", error);
    return [];
  }
};

export const addExtrasItemInTruck = async ({
  extraFoodName,
  extraFoodPrice,
  available,
  truckId,
}: {
  extraFoodName: string;
  extraFoodPrice: string;
  available: boolean;
  truckId: string;
}) => {
  const truckExtrasRef = doc(collection(db, COLLECTIONS.FOOD_EXTRAS));

  try {
    await setDoc(truckExtrasRef, {
      extraFoodName,
      extraFoodPrice,
      available,
      truckId: truckId,
      docId: truckExtrasRef.id,
      date: timestamp,
    });
    return truckExtrasRef.id;
  } catch (error) {
    console.error("Error Adding extras: ", error);
    return null;
  }
};

export const updateExtrasItemInTruck = async ({
  extraFoodName,
  extraFoodPrice,
  available,
  docId,
}: {
  extraFoodName: string;
  extraFoodPrice: string;
  available: boolean;
  docId: string;
}) => {
  const truckExtrasRef = doc(db, COLLECTIONS.FOOD_EXTRAS, docId);
  try {
    await updateDoc(truckExtrasRef, {
      extraFoodName,
      extraFoodPrice,
      available,
      date: timestamp,
    });
    return true;
  } catch (error) {
    console.error("Error updating extras: ", error);
    return false;
  }
};

export const removeExtraFromTruck = async (extraId: string) => {
  try {
    const extraRef = doc(db, COLLECTIONS.FOOD_EXTRAS, extraId);
    await deleteDoc(extraRef);
    return true;
  } catch (error) {
    console.error("Error deleting extra item  data: ", error);
    return null;
  }
};
