import React, { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.scss";
import { IoChevronDown } from "react-icons/io5";

interface DropDownProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (option: string) => void;
}

function DropDown({ title, options, selectedValue, onSelect }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) => option !== selectedValue);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <h3 className={styles.dropdown_title}>{title}</h3>
      <div
        className={`${styles.dropdown_btn} ${isOpen ? styles.open : ""}`}
        onClick={toggleOptions}
      >
        {selectedValue}
        <IoChevronDown
          className={`${styles.chevron} ${
            isOpen ? styles["dropdown_chevron-rotate"] : ""
          }`}
        />
      </div>

      {isOpen && (
        <ul className={`${styles.dropdown_content} ${styles.open}`}>
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={styles.dropdown_item}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
