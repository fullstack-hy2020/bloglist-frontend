import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getAll: async (state) => (state = await blogsService.getAll()),
    create: () => {},
    update: () => {},
    delete: () => {},
  },
});

export const { getAll } = blogsSlice.actions;

export default blogsSlice.reducer;
