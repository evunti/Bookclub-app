import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  coverUrl?: string;
}
interface BookItemsState {
  allBookItems: Book[];
}

const initialState: BookItemsState = {
  allBookItems: [],
};

const BookItemsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBookItem: (state, action: PayloadAction<Book>) => {
      state.allBookItems.unshift(action.payload);
    },
    updateBookItem: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Book> }>
    ) => {
      const idx = state.allBookItems.findIndex(
        (b) => b.id === action.payload.id
      );
      if (idx !== -1) {
        state.allBookItems[idx] = {
          ...state.allBookItems[idx],
          ...action.payload.data,
        };
      }
    },
    deleteBookItem: (state, action: PayloadAction<string>) => {
      state.allBookItems = state.allBookItems.filter(
        (b) => b.id !== action.payload
      );
    },
    setBookItems: (state, action: PayloadAction<Book[]>) => {
      state.allBookItems = action.payload;
    },
  },
});

export const { addBookItem, updateBookItem, deleteBookItem } =
  BookItemsSlice.actions;

export default BookItemsSlice.reducer;
