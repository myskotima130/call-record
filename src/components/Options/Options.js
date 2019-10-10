import React, { useState, useEffect } from "react";
import { TitlePrompt } from "../TitlePrompt/TitlePrompt";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import styles from "./Options.css";

export const Options = ({
  text = "Rename your record",
  record,
  onDelete,
  setSoftkey,
  softkey,
  current,
  onUpdateTitle
}) => {
  const [currentRecord] = useState(record);
  const [title, setTitle] = useState(currentRecord.title);
  const [isShownConfirm, setIsShownConfirm] = useState(false);

  const updateTitle = () => onUpdateTitle(currentRecord.id, title);

  useEffect(() => {
    if (isShownConfirm) {
      setSoftkey({
        ...softkey,
        center: "Delete",
        onKeyCenter: () => onDelete(currentRecord.id)
      });
    }
  }, [isShownConfirm]);

  useEffect(() => {
    setSoftkey({
      ...softkey,
      center: "Save",
      onKeyCenter: updateTitle
    });
  }, [title]);

  useEffect(() => {
    const element = document.querySelector("[nav-selected=true]");
    if (element) {
      let options = {};
      if (element.tagName === "INPUT") {
        options = {
          center: "Save",
          onKeyCenter: updateTitle
        };
      } else if (element.getAttribute("delete")) {
        options = {
          center: "Delete",
          onKeyCenter: () => element.click()
        };
      } else if (element.getAttribute("save")) {
        options = {
          center: "Save",
          onKeyCenter: () => element.click()
        };
      }

      setSoftkey({
        ...softkey,
        ...options
      });
    }
  }, [title, current]);

  return (
    <React.Fragment>
      {isShownConfirm ? (
        <ConfirmDialog text="Are you shure you want to delete this record?" />
      ) : (
        <div className={styles.wrapper}>
          <TitlePrompt text={text} value={title} setTitle={setTitle} />
          <h3
            className={styles.item}
            onClick={() => setIsShownConfirm(true)}
            nav-selectable="true"
            delete="true"
          >
            Delete record
          </h3>
          <h3 className={styles.item}>
            <a
              href={URL.createObjectURL(currentRecord.blob)}
              download={title}
              nav-selectable="true"
              save="true"
            >
              Save to device
            </a>
          </h3>
        </div>
      )}
    </React.Fragment>
  );
};
