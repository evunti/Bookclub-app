import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookItemsState {
  allBookItems: string[];
}

const initialState: BookItemsState = {
  allBookItems: [],
};

const BookItemsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBookItem: (state) => {
      state.allBookItems.unshift("");
    },
    updateBookItem: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      state.allBookItems[action.payload.index] = action.payload.value;
    },
    deleteBookItem: (state, action: PayloadAction<number>) => {
      state.allBookItems.splice(action.payload, 1);
    },
  },
});

export const { addBookItem, updateBookItem, deleteBookItem } =
  BookItemsSlice.actions;

export default BookItemsSlice.reducer;
