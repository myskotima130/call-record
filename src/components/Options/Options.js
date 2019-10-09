import React, { useState } from "react";
import { TitlePrompt } from "../TitlePrompt/TitlePrompt";
import styles from "./Options.css";

export const Options = ({ text = "Rename your record", record, onDelete }) => {
  const [title, setTitle] = useState(record.title);
  return (
    <div className={styles.wrapper}>
      <TitlePrompt value={title} text={text} setTitle={setTitle} />
      <h3
        className={styles.item}
        onClick={() => onDelete(record.id)}
        nav-selectable="true"
      >
        Delete record
      </h3>
      <h3 className={styles.item}>
        <a
          href={URL.createObjectURL(record.blob)}
          download={record.title}
          nav-selectable="true"
        >
          Save to device
        </a>
      </h3>
    </div>
  );
};
