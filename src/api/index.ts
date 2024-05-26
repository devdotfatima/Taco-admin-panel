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
  writeBatch,
} from "firebase/firestore";
import { auth, db, timestamp } from "../firebase/FirebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserT } from "../utils/types";

export const getTruckOwners = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userRole", "==", "TruckOwner"));
    const dbResults = await getDocs(q);
    let users: any[] = [];
    dbResults.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch (error) {
    console.error("Error fetching truck owners data: ", error);
    return [];
  }
};

export const getTrucksByTruckOwner = async (truckOwnerId: string) => {
  try {
    const trucksRef = collection(db, "trucks");
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
    const trucksRef = collection(db, "trucks");
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

export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user.uid; // Return the UID of the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const addTruckOwner = async ({
  userDOB,
  userEmail,
  userFullName,
  userGender,
  userId,
  userPhone,
  userProfileImg,
  userRole,
}: UserT) => {
  try {
    await setDoc(doc(db, "users", userId), {
      userDOB,
      userEmail,
      userFullName,
      userGender,
      userId,
      userPhone,
      userProfileImg,
      userRole,
      date: timestamp,
    });
    return true;
  } catch (error) {
    console.error("Error Adding truck  data: ", error);
    return error;
  }
};

export const addTruck = async ({
  truckName,
  truckAddress,
  truckOwnerId,
  truckSupervisorName,
  supervisorUID,
}: {
  truckName: string;
  truckOwnerId: string;
  truckAddress: string;
  truckSupervisorName: string;
  supervisorUID: string;
}) => {
  try {
    await setDoc(doc(db, "trucks", supervisorUID), {
      truckAddress: truckAddress,
      truckId: supervisorUID,
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

export const removeTruck = async (truckId: string) => {
  try {
    const TruckRef = doc(db, "trucks", truckId);
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

const deleteMenuItemsInBatch = async (truckId: string) => {
  const batch = writeBatch(db);

  const trucksRef = collection(db, "truck_food_menu");
  const q = query(trucksRef, where("truckId", "==", truckId));
  const dbResults = await getDocs(q);

  // Update the population of 'SF'
  dbResults.forEach((doc) => {
    batch.delete(doc.ref);
  });
  // Commit the batch
  await batch.commit();
};

const deleteExtrasInBatch = async (truckId: string) => {
  const batch = writeBatch(db);

  const extrasRef = collection(db, "food_extras");
  const q = query(extrasRef, where("truckId", "==", truckId));
  const dbResults = await getDocs(q);

  // Update the population of 'SF'
  dbResults.forEach((doc) => {
    batch.delete(doc.ref);
  });
  // Commit the batch
  await batch.commit();
};

const deleteAddonsInBatch = async (truckId: string) => {
  const batch = writeBatch(db);

  const addonsRef = collection(db, "food_addons");
  const q = query(addonsRef, where("truckId", "==", truckId));
  const dbResults = await getDocs(q);

  dbResults.forEach((doc) => {
    batch.delete(doc.ref);
  });
  // Commit the batch
  await batch.commit();
};

export const getTruckDetails = async (truckId: string) => {
  try {
    const trucksRef = collection(db, "trucks");
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

export const getTruckMenuItems = async (truckId: string) => {
  try {
    const trucksRef = collection(db, "truck_food_menu");
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

export const getTruckExtras = async (truckId: string) => {
  try {
    const extrasRef = collection(db, "food_extras");
    const q = query(extrasRef, where("truckId", "==", truckId));
    const dbResults = await getDocs(q);
    let truckExtrasData: any[] = [];
    dbResults.forEach((doc) => {
      truckExtrasData.push(doc.data());
    });
    return truckExtrasData;
  } catch (error) {
    console.error("Error fetching truck owners data: ", error);
    return [];
  }
};

export const getTruckAddons = async (truckId: string) => {
  try {
    const addonsRef = collection(db, "food_addons");
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
  const truckFoodMenuRef = doc(collection(db, "truck_food_menu"));

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
  const truckFoodMenuRef = doc(db, "truck_food_menu", docId); // Reference to the specific document by ID

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
  const truckExtrasRef = doc(collection(db, "food_extras"));

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
  const truckExtrasRef = doc(db, "food_extras", docId);
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
  const truckAddonsRef = doc(collection(db, "food_addons"));

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
  const truckAddOnRef = doc(db, "food_addons", docId);
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
export const removeMenuItemFromTruck = async (menuItemId: string) => {
  try {
    const menuItemRef = doc(db, "truck_food_menu", menuItemId);
    await deleteDoc(menuItemRef);
    return true;
  } catch (error) {
    console.error("Error deleting menu item  data: ", error);
    return null;
  }
};

export const removeExtraFromTruck = async (extraId: string) => {
  try {
    const extraRef = doc(db, "food_extras", extraId);
    await deleteDoc(extraRef);
    return true;
  } catch (error) {
    console.error("Error deleting menu item  data: ", error);
    return null;
  }
};

export const removeAddonFromTruck = async (addonId: string) => {
  try {
    const addonRef = doc(db, "food_addons", addonId);
    await deleteDoc(addonRef);
    return true;
  } catch (error) {
    console.error("Error deleting menu item  data: ", error);
    return null;
  }
};
