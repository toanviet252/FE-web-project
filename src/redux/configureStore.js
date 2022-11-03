import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialAuthState = { isAuthentication: false };
export const authSlice = createSlice({
  name: "Authentication",
  initialState: intialAuthState,
  reducers: {
    //tương đương với {type: “counter/increase” }, mỗi một phần tử trong object reducer tương đương với 1 action và type như trong redux thông thường
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
