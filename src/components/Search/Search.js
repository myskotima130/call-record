import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../SVG/SearchIcon/SearchIcon";
import classnames from "classnames";
import Clear from "../../SVG/Clear/Clear";
import styles from "./Search.css";

export const Search = ({
  placeholder,
  selectable,
  setSoftkey,
  softkey,
  forSearch,
  searchBy,
  setSearchResult
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputStyles, setInputStyles] = useState(styles.input);
  const focusRef = useRef();

  useEffect(() => {
    if (inputValue) {
      setSoftkey({
        ...softkey,
        center: "Clear",
        onKeyCenter: () => setInputValue("")
      });

      const filteredElems = forSearch.filter(elem =>
        elem[searchBy].match(new RegExp(inputValue, "gi"))
      );

      setSearchResult(filteredElems);
    } else {
      setSearchResult(forSearch);
      focusRef.current.focus();
      setSoftkey({
        ...softkey,
        center: "Select",
        onKeyCenter: () => focusRef.current.focus()
      });
    }
  }, [inputValue]);

  useEffect(() => {
    focusRef.current.onfocus = () => {
      setInputStyles(classnames(styles.input, styles.focus));
    };
    focusRef.current.onblur = () => {
      setInputStyles(classnames(styles.input));
    };
  }, [focusRef]);

  return (
    <div className={styles.wrapper}>
      <div className={inputStyles}>
        {!inputValue && (
          <div className={styles.icon}>
            <SearchIcon />
          </div>
        )}
        <input
          ref={focusRef}
          nav-selectable={selectable ? "true" : null}
          type="text"
          search="true"
          placeholder={placeholder}
          onChange={e => setInputValue(e.currentTarget.value)}
          value={inputValue}
        ></input>
        {inputValue && (
          <div className={styles.clear}>
            <Clear />
          </div>
        )}
      </div>
    </div>
  );
};
