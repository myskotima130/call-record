import React, { useEffect, useRef } from "react";
import Clear from "../../SVG/Clear/Clear";
import styles from "./TitlePrompt.css";

export const TitlePrompt = ({ text, setTitle, value, isSelected }) => {
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  }, [focusRef]);

  useEffect(() => {
    if (!value) {
      focusRef.current.focus();
    }
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.text}>{text}</h2>
      <div>
        <input
          ref={focusRef}
          nav-selectable="true"
          type="text"
          option="true"
          className={styles.input}
          onChange={e => setTitle(e.currentTarget.value)}
          value={value}
        ></input>
        {value && (
          <div className={styles.clear}>
            <Clear />
          </div>
        )}
      </div>
    </div>
  );
};
