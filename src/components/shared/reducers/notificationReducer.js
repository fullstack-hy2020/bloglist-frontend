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
    show: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.display = "";
    },
    hide: (state) => (state = initialState),
  },
});

const notificationReducer = notificationSlice.reducer;

export const setNotification =
  (message, type, time = 5) =>
  (dispatch) => {
    console.log(dispatch);
    console.log(message);
    console.log(type);
    console.log(time);
  };

export default notificationReducer;
