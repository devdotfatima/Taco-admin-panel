import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, timestamp } from "../firebase/FirebaseInit";
import { UserT } from "../utils/types";
import { COLLECTIONS } from "../utils/const";

export const createUserInAuthentication = async (
  email: string,
  password: string
) => {
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

export const addUser = async ({
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
    await setDoc(doc(db, COLLECTIONS.USERS, userId), {
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
    console.error("Error Adding Truck Owners ", error);
    return error;
  }
};

export const getUsers = async (userRole: string) => {
  try {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(usersRef, where("userRole", "==", userRole));
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
