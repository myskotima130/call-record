import React from "react";
import Contact from "./Contact/Contact";
import styles from "./ContactsContainer.css";

export const ContactsContainer = ({ contacts, mediaRecorder, addRecord }) => {
  let currentChar;
  return (
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
