import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialAuthState = { isAuthentication: false };
export const authSlice = createSlice({
  name: "Authentication",
  initialState: intialAuthState,
  reducers: {
    login(state) {
      state.isAuthentication = true;
    },
    logout(state) {
      state.isAuthentication = false;
    },
  },
});

export const store = configureStore({
  reducer: authSlice.reducer,
});
export const authAction = authSlice.actions;
