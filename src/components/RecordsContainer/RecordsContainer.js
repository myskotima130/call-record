import React, { useState } from "react";
import moment from "moment";
import Records from "./Records/Records";
import styles from "./RecordsContainer.css";

export const RecordsContainer = ({ records, onDelete }) => {
  const [isRecordsShown, setIsRecordsShown] = useState(false);
  const displayedRecords = [];
  const sortedRecords = records.sort((a, b) => (a.date > b.date ? -1 : 1));
  return isRecordsShown ? (
    <Records recordTel={isRecordsShown} />
  ) : (
    <div className={styles.wrapper}>
      {sortedRecords.length ? (
        sortedRecords.map(record => {
          if (displayedRecords.find(tel => tel === record.tel)) return null;

          const allRecords = sortedRecords.filter(
            rec => rec.tel === record.tel
          );
          const fromNow = moment(allRecords[0].date).fromNow();
          displayedRecords.push(record.tel);

          return (
            <div key={record.id} onClick={() => setIsRecordsShown(record.tel)}>
              <div className={styles.itemWrapper}>
                <div className={styles.top}>
                  <p className={styles.name}>{record.name}</p>
                  <p className={styles.col}>{allRecords.length}</p>
                </div>
                <div className={styles.bottom}>
                  <p className={styles.tel}>{record.tel}</p>
                  <p className={styles.fromNow}>{fromNow}</p>
                </div>
              </div>
              {/* <button onClick={() => onDelete(record.id)}>delete</button> */}
            </div>
          );
        })
      ) : (
        <p className={styles.noRecordsText}>
          Seems you didn’t record any calls, go to “contacts” and start
          conversation
        </p>
      )}
    </div>
  );
};
