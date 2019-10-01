import React from "react";
import Contact from "./Contact/Contact";
import styles from "./ContactsContainer.css";

export const ContactsContainer = ({ contacts, mediaRecorder }) => {
  let currentName;
  return (
    <div className={styles.wrapper}>
      {contacts.map(contact => (
        <React.Fragment>
          {currentName !== contact.name[0] && contact.name[0]}
          <Contact contact={contact} mediaRecorder={mediaRecorder} />
        </React.Fragment>
      ))}
    </div>
  );
};
