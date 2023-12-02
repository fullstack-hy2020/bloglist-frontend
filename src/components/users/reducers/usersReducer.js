import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import usersService from "../services/usersService";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    set: (state, action) => action.payload,
  },
});

const { set } = usersSlice.actions;

export const getAll = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch(set(users));
};

export default usersSlice.reducer;
