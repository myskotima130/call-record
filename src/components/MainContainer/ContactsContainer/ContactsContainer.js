import React, { useState } from "react";
import Contact from "./Contact/Contact";
import moment from "moment";
import { TitlePrompt } from "../../../components";
import styles from "./ContactsContainer.css";

const ContactsContainer = ({
  contacts,
  mediaRecorder,
  addRecord,
  setSoftkey,
  softkey,
  isShownPrompt,
  setIsShownPrompt
}) => {
  let currentChar;
  const [title, setTitle] = useState(`Record ${moment().format("D/MMM")}`);

  return isShownPrompt ? (
    <div className={styles.prompt}>
      <TitlePrompt
        text="Enter a name for your record"
        setTitle={setTitle}
        value={title}
      />
    </div>
  ) : (
    <div>
      {contacts.map((contact, index) => {
        const isCharShow = currentChar !== contact.name[0].toUpperCase();
        if (isCharShow) {
          currentChar = contact.name[0];
        }
        return (
          <div key={index}>
            {isCharShow && <div className={styles.char}>{currentChar}</div>}
            <Contact
              setTitle={setTitle}
              setSoftkey={setSoftkey}
              softkey={softkey}
              title={title}
              isShownPrompt={isShownPrompt}
              setIsShownPrompt={setIsShownPrompt}
              contact={contact}
              mediaRecorder={mediaRecorder}
              addRecord={addRecord}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ContactsContainer;
