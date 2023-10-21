import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import blogsService from "../services/blogsService";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    set: (state, action) => action.payload,
    append: (state, action) => (state = [...state, action.payload]),
    removeById: (state, action) =>
      (state = state.filter((blog) => blog.id !== action.payload)),
    incrementLikesById: (state, action) =>
      (state = state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, likes: action.payload.likes }
      )),
  },
});

const { set, append, removeById, incrementLikesById } = blogsSlice.actions;

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

export const like = (blog) => async (dispatch) => {
  const id = blog.id;
  const likes = blog.likes + 1;
  await blogsService.updateById(id, { likes: likes });
  dispatch(incrementLikesById({ id: id, likes: likes }));
};

export default blogsSlice.reducer;
