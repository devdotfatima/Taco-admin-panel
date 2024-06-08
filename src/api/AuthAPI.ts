import { auth } from "../firebase/FirebaseInit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signInAndCheckAdmin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Get custom claims from the signed-in user
    const idTokenResult = await user.getIdTokenResult();
    const isAdmin = idTokenResult.claims.admin;

    if (isAdmin) {
      return user;
      // Redirect or perform admin-specific actions
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error: any) {
    console.error("Login error:", error.message);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error: any) {
    console.error("Sign out error:", error.message);
  }
};
