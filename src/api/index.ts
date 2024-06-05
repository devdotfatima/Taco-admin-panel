import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/FirebaseInit";

export * from "./AddonAPI";
export * from "./ExtrasAPI";
export * from "./TruckAPI";
export * from "./MenuItemAPI";
export * from "./UsersAPI";

export const uploadImage = async (file: File) => {
  if (!file) return;

  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}-${file.name}`;

  const storageRef = ref(storage, `images/${uniqueFileName}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!");

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
};
