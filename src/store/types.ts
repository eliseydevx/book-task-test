export interface VolumeInfo {
  title: string;
  authors: string[];
  imageLinks?: {
    thumbnail: string;
  };
  categories?: string[];
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface Filters {
  category: string;
  sortBy: string;
}

export interface FetchBooksResponse {
  items: Book[];
}

export interface BooksState {
  books: Book[];
  startIndex: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  filters: Filters;
}
