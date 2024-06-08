import toast from "react-hot-toast";
import { signInAndCheckAdmin, signOutUser } from "../../api";
import { appActions } from "../slices/app";
import { AppDispatch, RootState } from "../store";

export function ToggleSidebar() {
  return async (
    dispatch: AppDispatch
    // getState: () => RootState
  ) => {
    dispatch(appActions.toggleSideBar());
  };
}

export function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await signInAndCheckAdmin({ email, password });

      console.log(response);
      if (response) {
        dispatch(
          appActions.login({
            isLoggedIn: true,
            user: response,
          })
        );
      } else {
        toast.error("Invalid Credentials");
      }

      // dispatch(authActions.updateIsLoading({ isLoading: false, error: false }));
    } catch (error) {
      console.log(error);

      // dispatch(showSnackbar({ severity: "error", message: error.message }));

      // dispatch(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
  };
}

export function logoutUser() {
  return async (dispatch: AppDispatch) => {
    try {
      await signOutUser();
      dispatch(appActions.logout());
    } catch (error) {
      console.log(error);
    }
  };
}
