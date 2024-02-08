import React, { useState } from "react";
import styles from "./Header.module.scss";
import { CgProfile } from "react-icons/cg";
import DropDown from "../DropDown/DropDown";
import SearchInput from "../SearchInput/SearchInput";
import { useDispatch } from "react-redux";
import { setCategoryFilter, setSortByFilter } from "../../store/booksSlice";

function Header() {
  const categoriesOptions: string[] = [
    "all",
    "art",
    "biography",
    "computers",
    "history",
    "medical",
    "poetry",
  ];
  const sortOptions: string[] = ["relevance", "newest"];

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("relevance");

  const dispatch = useDispatch();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    dispatch(setCategoryFilter(category));
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    dispatch(setSortByFilter(sortOption));
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p className="">Books</p>
        <span>for your mind.</span>
      </div>

      <div className={styles.search}>
        <SearchInput />

        <div className={styles.filter_block}>
          <DropDown
            title="Categories"
            options={categoriesOptions}
            selectedValue={selectedCategory}
            onSelect={handleCategoryChange}
          />
          <DropDown
            title="Sort by"
            options={sortOptions}
            selectedValue={selectedSort}
            onSelect={handleSortChange}
          />
        </div>
      </div>

      <CgProfile className={styles.user} />
    </header>
  );
}

export default Header;
