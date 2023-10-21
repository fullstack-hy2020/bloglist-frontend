import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    set: (state, action) => {
      user: action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  const user = await authService.login(username, password);
  console.log(user);
  dispatch(set(user));
};

export default authSlice.reducer;
