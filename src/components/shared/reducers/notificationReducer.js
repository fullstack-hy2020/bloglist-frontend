import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
  display: "none",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, action) => ({ ...action.payload, display: "" }),
    hide: (state) => (state = initialState),
  },
});

const { show, hide } = notificationSlice.actions;

export const setNotification = (payload) => (dispatch) => {
  dispatch(show(payload));
  setTimeout(() => {
    dispatch(hide());
  }, 5000);
};

export default notificationSlice.reducer;
