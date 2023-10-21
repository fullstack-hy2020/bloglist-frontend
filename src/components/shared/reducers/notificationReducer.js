import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  display: "none",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, action) => {
      state.message = action.payload;
      state.display = "";
    },
    hide: (state) => (state = initialState),
  },
});

const notificationReducer = notificationSlice.reducer;

export const setNotification = (message, time) => (dispatch) => {
  console.log(dispatch);
  console.log(message);
  console.log(time);
};

export default notificationReducer;
