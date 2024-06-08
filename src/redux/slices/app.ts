import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as any,
  sideBarVisibility: false,
  isAuthenticated: true,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },

    toggleSideBar(state) {
      state.sideBarVisibility = !state.sideBarVisibility;
    },
    // Add a logout action to reset state
    logout(state) {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const appActions = slice.actions;
export default slice.reducer;
