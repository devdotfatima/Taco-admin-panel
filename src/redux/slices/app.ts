import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

const initialState = {
  user: {},
  sideBarVisibilty: false,
  isLoggedIn: true,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    // Toggle Sidebar
    toggleSideBar(state) {
      console.log("sjdh");

      state.sideBarVisibilty = !state.sideBarVisibilty;
    },
  },
});

// Reducer
export const appActions = slice.actions;
export default slice.reducer;

// ----------------------------------------------------------------------
