import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase/FirebaseInit";

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

export const deleteImage = async (imageUrl: string) => {
  try {
    // Extract the file path from the URL
    const decodedUrl = decodeURIComponent(imageUrl);
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;
    const filePath = decodedUrl.replace(baseUrl, "").split("?")[0];

    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
