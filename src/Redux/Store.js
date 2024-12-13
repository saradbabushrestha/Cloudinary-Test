import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export default store;
