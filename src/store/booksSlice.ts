import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BooksState, FetchBooksResponse } from "./types";

const initialState: BooksState = {
  books: [],
  startIndex: 0,
  status: "idle",
  error: null,
  searchTerm: "",
  filters: {
    category: "all",
    sortBy: "relevance",
  },
};

export const fetchBooks = createAsyncThunk<FetchBooksResponse, void>(
  "books/fetchBooks",
  async (_, { getState }) => {
    const state = getState() as { books: BooksState };
    const response = await axios.get<FetchBooksResponse>(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: state.books.searchTerm,
          startIndex: state.books.startIndex,
          maxResults: 30,
          category: state.books.filters.category,
          orderBy: state.books.filters.sortBy,
          key: "AIzaSyCojoPNi4f3WmmueWTc1pSJ2vUTVWMUYnQ",
        },
      }
    );
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    incrementStartIndex: (state) => {
      state.startIndex += 30;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.startIndex = 0;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      state.startIndex = 0;
    },
    setSortByFilter: (state, action: PayloadAction<string>) => {
      state.filters.sortBy = action.payload;
      state.startIndex = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (state.startIndex === 0) {
          state.books = action.payload.items;
        } else {
          const startIndexIndex = state.startIndex / 30 - 1;
          state.books.splice(startIndexIndex * 30, 30, ...action.payload.items);
        }

        state.startIndex += 30;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  incrementStartIndex,
  setSearchTerm,
  setCategoryFilter,
  setSortByFilter,
} = booksSlice.actions;

export default booksSlice.reducer;
