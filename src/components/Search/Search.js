import React, { useState, useEffect } from "react";
import SearchIcon from "../../SVG/SearchIcon/SearchIcon";
import Clear from "../../SVG/Clear/Clear";
import styles from "./Search.css";

export const Search = ({
  placeholder,
  selectable,
  setSoftkey,
  softkey,
  forSearch,
  searchBy
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue) {
      setSoftkey({
        ...softkey,
        center: "Remove",
        onKeyCenter: () => setInputValue("")
      });

      const filteredElems = forSearch.filter(elem =>
        elem[searchBy].search(inputValue) !== -1 ? elem : null
      );

      console.log(filteredElems);
    }
  }, [inputValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <SearchIcon />
        <input
          nav-selectable={selectable ? "true" : null}
          type="text"
          search="true"
          placeholder={placeholder}
          onChange={e => setInputValue(e.currentTarget.value)}
          value={inputValue}
        ></input>
        {inputValue && (
          <div onClick={() => setInputValue("")} className={styles.clear}>
            <Clear />
          </div>
        )}
      </div>
    </div>
  );
};
