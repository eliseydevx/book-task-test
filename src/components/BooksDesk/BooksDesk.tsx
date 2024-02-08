import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, incrementStartIndex } from "../../store/booksSlice";

import styles from "./BooksDesk.module.scss";
import CardBook from "../CardBook/CardBook";
import { AppDispatch, RootState } from "../../store/store";
import { ImSpinner9 } from "react-icons/im";

function BooksDesk() {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const status = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);
  const startIndex = useSelector((state: RootState) => state.books.startIndex);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchBooks());
  //   }
  // }, [status, dispatch, startIndex]);

  useEffect(() => {
    if (status === "idle" && startIndex === 0 && !books.length) {
      // Первый заход на сайт, не отправляем запрос, так как searchTerm пустой
      return;
    }

    // dispatch(fetchBooks());
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [status, dispatch, startIndex, books.length]);

  const handleLoadMore = () => {
    dispatch(incrementStartIndex());
    dispatch(fetchBooks());
  };

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={styles.desk}>
      <p className={styles.desk_quantity}>
        Found books: <span>{books.length}</span>
      </p>
      <div className={styles.desk_container}>
        {books.map((book) => (
          <CardBook
            key={book.id}
            author={
              book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ""
            }
            title={book.volumeInfo.title}
            img={book.volumeInfo.imageLinks?.thumbnail || ""}
            category={book.volumeInfo.categories?.[0] || ""}
          />
        ))}
      </div>
      {status === "loading" ? (
        <ImSpinner9 className={styles.desk_spinner} />
      ) : (
        <>
          {books.length === 0 ? (
            <p className={styles.desk_title}>Введите название книги</p>
          ) : (
            <button className={styles.desk_btn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default BooksDesk;
