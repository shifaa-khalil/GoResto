import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  isManager: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setManager: (state) => {
      state.isManager = true;
    },
    resetManager: (state) => {
      state.isManager = false;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    resetAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { setManager, resetManager, setAdmin, resetAdmin } =
  authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
