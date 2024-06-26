import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart:(state)=>{
      state.loading = true;
    },
    deleteUserSuccess: (state, action)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state ,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    SignOutUserStart:(state)=>{
      state.loading = true;
    },
    SignOutUserSuccess: (state, action)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    SignOutUserFailure: (state ,action)=>{
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  SignOutUserFailure,
  SignOutUserStart,
  SignOutUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
