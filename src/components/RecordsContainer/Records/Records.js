import React from "react";
import styles from "./Records.css";
import Record from "./Record/Record";

const Records = ({ sortedRecords, contact }) => {
  console.log(contact);

  return sortedRecords.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.itemWrapper}>
        <div className={styles.top}>
          <p className={styles.name}>{contact.name}</p>
          <p className={styles.col}>{sortedRecords.length}</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.tel}>{contact.tel}</p>
          <p className={styles.fromNow}>0:00:00</p>
        </div>
      </div>
      {sortedRecords.map((record, index) => (
        <Record key={record.id} record={record} />
      ))}
    </div>
  ) : null;
};

export default Records;
