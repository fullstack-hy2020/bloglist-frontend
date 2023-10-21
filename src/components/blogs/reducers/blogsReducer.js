import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    set: (state, action) => (state = action.payload),
    append: (state, action) => (state = [...state, action.payload]),
    removeById: (state, action) =>
      (state = state.filter((blog) => blog.id !== action.payload)),
    like: () => {},
  },
});

const { set, append, removeById, like } = blogsSlice.actions;

export const create = (blog) => async (dispatch) => {
  const newBlog = await blogsService.create(blog);
  dispatch(append(newBlog));
};

export const getAll = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(set(blogs));
};

export const remove = (blog) => async (dispatch) => {
  await blogsService.del(blog);
  dispatch(removeById(blog.id));
};

export default blogsSlice.reducer;
