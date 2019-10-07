import React, { useEffect, useState } from "react";
import styles from "./TitlePrompt.css";

export const TitlePrompt = ({ text, setTitle, setSoftkey }) => {
  const [inputValue, setInputValue] = useState("Record");

  const onSave = () => setTitle(inputValue);

  useEffect(() => {
    setSoftkey({
      left: "",
      center: "Save",
      right: "",
      onKeyCenter: onSave
    });
  }, []);

  const onChange = e => setInputValue(e.currentTarget.value);

  return (
    <div className={styles.wrapper}>
      <h2>{text}</h2>
      <input
        className={styles.input}
        type="text"
        defaultValue="Record"
        onChange={onChange}
      ></input>
    </div>
  );
};
