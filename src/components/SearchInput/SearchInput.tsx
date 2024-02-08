import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchInput.module.scss";
import { fetchBooks, setSearchTerm } from "../../store/booksSlice";
import { AppDispatch } from "../../store/store";

function SearchInput() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTermLocal] = useState<string>(""); // Укажем явно тип для useState

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTermLocal(term);
    dispatch(setSearchTerm(term));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchBooks());
  };

  return (
    <form className={styles.container} onSubmit={handleFormSubmit}>
      <input
        className={styles.container_input}
        type="text"
        placeholder="Search by name, title or author"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.container_btn}>
        <IoSearchOutline className={styles.container_btn_loop} />
      </button>
    </form>
  );
}

export default SearchInput;
