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
  onUpdateTitle,
  setCurrent
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
    setCurrent(0);
  }, []);

  useEffect(() => {
    setSoftkey({
      ...softkey,
      center: "Update",
      onKeyCenter: updateTitle
    });
  }, [title]);

  useEffect(() => {
    const element = document.querySelector("[nav-selected=true]");
    if (element) {
      let options = {};
      if (element.tagName === "INPUT") {
        options = {
          center: "Update",
          onKeyCenter: updateTitle,
          right: "Clear",
          onKeyRight: () => setTitle("")
        };
      } else if (element.getAttribute("delete")) {
        options = {
          center: "Delete",
          onKeyCenter: () => element.click(),
          right: "",
          onKeyRight: undefined
        };
      } else if (element.getAttribute("save")) {
        options = {
          center: "Save",
          onKeyCenter: () => element.click(),
          right: "",
          onKeyRight: undefined
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
          <div className={styles.bottomLine} />
          <a
            className={styles.item}
            href={URL.createObjectURL(currentRecord.blob)}
            download={title}
            nav-selectable="true"
            save="true"
          >
            Save to device
          </a>
        </div>
      )}
    </React.Fragment>
  );
};
