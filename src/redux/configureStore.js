import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialAuthState = {
  isAuthenticated: false,
  currentUser: null,
  curentUserPhoto: null,
  nameFind: "",
  listContact: [],
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
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setCurrentUserPhoto(state, action) {
      state.curentUserPhoto = action.payload;
    },
    setNameFind(state, action) {
      state.nameFind = action.payload;
    },
  },
});
export const Slice2 = createSlice({
  name: "Slice2",
  initialState: {
    props1: "abc",
    props2: "def",
  },
  reducers: {
    increase(state, action) {
      state.props1 = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { Auth: AuthSlice.reducer, Slice: Slice2.reducer },
});
export const AuthAction = AuthSlice.actions;
