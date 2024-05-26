import { appActions } from "../slices/app";
import {
  AppDispatch,
  //  RootState
} from "../store";

export function ToggleSidebar() {
  return async (
    dispatch: AppDispatch
    // getState: () => RootState
  ) => {
    dispatch(appActions.toggleSideBar());
  };
}
