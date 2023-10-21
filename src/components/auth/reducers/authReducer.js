import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  user: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action) => (state = action.payload),
    reset: (state) => (state = initialState),
  },
});

const { set, reset } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await authService.login(username, password);
    dispatch(set({ user, success: true }));
    window.localStorage.setItem("user", JSON.stringify(user));
  } catch {
    dispatch(reset());
    window.localStorage.clear();
    throw "Invalid username or password. Try again.";
  }
};

export const logout = () => (dispatch) => {
  dispatch(reset());
  window.localStorage.clear();
};

export default authSlice.reducer;
