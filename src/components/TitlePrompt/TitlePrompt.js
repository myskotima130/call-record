import React from "react";
import Clear from "../../SVG/Clear/Clear";
import styles from "./TitlePrompt.css";

export const TitlePrompt = ({ text, setTitle, value }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.text}>{text}</h2>
      <div>
        <input
          className={styles.input}
          type="text"
          onChange={e => setTitle(e.currentTarget.value)}
          value={value}
          nav-selectable="true"
          option="true"
          autoFocus
          onBlur={e => e.currentTarget.focus()}
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
