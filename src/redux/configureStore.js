import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialAuthState = {
  isAuthenticated: false,
};
export const AuthSlice = createSlice({
  name: "Authentication",
  initialState: intialAuthState,
  reducers: {
    logIn(state) {
      state.isAuthenticated = true;
    },
    logOut(state) {
      state.isAuthenticated = false;
    },
  },
});
export const store = configureStore({
  reducer: AuthSlice.reducer,
});
export const AuthAction = AuthSlice.actions;
