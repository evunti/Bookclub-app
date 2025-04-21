import { configureStore } from "@reduxjs/toolkit";
import BookItemsReducer from "./itemsSlice";

const store = configureStore({
  reducer: {
    items: BookItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
