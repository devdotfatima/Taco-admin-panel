import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, timestamp } from "../firebase/FirebaseInit";

import { COLLECTIONS } from "../utils/const";
import { deleteExtrasInBatch, deleteAddonsInBatch } from ".";
import { deleteMenuItemsInBatch } from "./MenuItemAPI";

export const getTrucksByTruckOwner = async (truckOwnerId: string) => {
  try {
    const trucksRef = collection(db, COLLECTIONS.TRUCKS);
    const q = query(trucksRef, where("truckOwnerId", "==", truckOwnerId));
    const dbResults = await getDocs(q);
    let trucks: any[] = [];
    dbResults.forEach((doc) => {
      trucks.push(doc.data());
    });
    return trucks;
  } catch (error) {
    console.error("Error fetching truck owners data: ", error);
    return [];
  }
};

export const getTrucks = async () => {
  try {
    const trucksRef = collection(db, COLLECTIONS.TRUCKS);
    const q = query(trucksRef, orderBy("truckName", "desc"));
    const dbResults = await getDocs(q);
    let trucksData: any = [];
    dbResults.forEach((doc) => {
      console.log(doc.data());

      trucksData.push(doc.data());
    });
    return trucksData;
  } catch (error) {
    console.error("Error fetching trucks data: ", error);
  }
};

export const addTruck = async ({
  truckName,
  truckAddress,
  truckOwnerId,
  truckSupervisorName,
  truckId,
}: {
  truckName: string;
  truckOwnerId: string;
  truckAddress: string;
  truckSupervisorName: string;
  truckId: string;
}) => {
  try {
    await setDoc(doc(db, COLLECTIONS.TRUCKS, truckId), {
      truckAddress: truckAddress,
      truckId: truckId,
      truckName: truckName,
      truckOwnerId: truckOwnerId,
      truckSupervisorName: truckSupervisorName,
      date: timestamp,
    });
    return true;
  } catch (error) {
    console.error("Error Adding truck  data: ", error);
    return error;
  }
};

export const updateTruck = async ({
  truckName,
  truckAddress,
  truckSupervisorName,
  truckId,
}: {
  truckName: string;
  truckAddress: string;
  truckSupervisorName: string;
  truckId: string;
}) => {
  const truckRef = doc(db, COLLECTIONS.TRUCKS, truckId);

  try {
    await updateDoc(truckRef, {
      truckAddress: truckAddress,
      truckName: truckName,
      truckSupervisorName: truckSupervisorName,
      date: timestamp,
    });
    return true;
  } catch (error) {
    console.error("Error updating truck: ", error);
    return false;
  }
};

export const getTruckDetails = async (truckId: string) => {
  try {
    const trucksRef = collection(db, COLLECTIONS.TRUCKS);
    const q = query(trucksRef, where("truckId", "==", truckId));
    const dbResults = await getDocs(q);
    let truckData: any[] = [];
    dbResults.forEach((doc) => {
      truckData.push(doc.data());
    });
    return truckData;
  } catch (error) {
    console.error("Error fetching truck owners data: ", error);
    return [];
  }
};

export const removeTruck = async (truckId: string) => {
  try {
    const TruckRef = doc(db, COLLECTIONS.TRUCKS, truckId);
    await deleteMenuItemsInBatch(truckId);
    await deleteExtrasInBatch(truckId);
    await deleteAddonsInBatch(truckId);
    await deleteDoc(TruckRef);
    return true;
  } catch (error) {
    console.error("Error deleting Truck: ", error);
    return null;
  }
};
