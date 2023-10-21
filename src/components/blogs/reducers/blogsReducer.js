import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    set: (state, action) => (state = action.payload),
    append: (state, action) => (state = [...state, action.payload]),
    update: () => {},
    delete: () => {},
  },
});

const { set, append } = blogsSlice.actions;

export const create = (blog) => async (dispatch) => {
  const newBlog = await blogsService.create(blog);
  dispatch(append(newBlog));
};

export const getAll = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(set(blogs));
};

export default blogsSlice.reducer;
