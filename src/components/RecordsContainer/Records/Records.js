import React from "react";
import { convertMS } from "../../../helpers/convertMS";
import styles from "./Records.css";
import Record from "./Record/Record";

const Records = ({ sortedRecords, contact }) => {
  const sumTime = sortedRecords.reduce(
    (sum, current) => sum + current.duration,
    0
  );

  return (
    <React.Fragment>
      <div className={styles.itemWrapper}>
        <div className={styles.top}>
          <p className={styles.name}>{contact.name}</p>
          <p className={styles.col}>{sortedRecords.length}</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.tel}>{contact.tel}</p>
          <p className={styles.fromNow}>{convertMS(sumTime)}</p>
        </div>
      </div>
      <div className={styles.wrapper}>
        {sortedRecords.map((record, index) => (
          <Record key={record.id} record={record} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Records;
