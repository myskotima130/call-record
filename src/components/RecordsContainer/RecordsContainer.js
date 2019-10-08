import React, { useState, useEffect } from "react";
import moment from "moment";
import { Options } from "../Options/Options";
import Records from "./Records/Records";
import styles from "./RecordsContainer.css";

export const RecordsContainer = ({
  records,
  onDelete,
  softkey,
  setSoftkey
}) => {
  const [recordTel, setRecordTel] = useState(null);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const displayedRecords = [];
  const sortedRecords = records.sort((a, b) => (a.date > b.date ? -1 : 1));

  const showOptions = () => setIsShowOptions(!isShowOptions);
  const getBack = () => {
    if (!isShowOptions) {
      setRecordTel(null);
    }

    setIsShowOptions(false);
  };

  useEffect(() => {
    setSoftkey({
      ...softkey,
      left: recordTel ? (isShowOptions ? "Cancel" : "Back") : "",
      right: recordTel ? (isShowOptions ? "" : "Options") : "",
      center: recordTel ? (isShowOptions ? "Save" : "Play") : "Select",
      onKeyRight: showOptions,
      onKeyLeft: getBack
    });
  }, [recordTel, isShowOptions]);

  return recordTel ? (
    isShowOptions ? (
      <div className={styles.options}>
        <Options />
      </div>
    ) : (
      <Records recordTel={recordTel} />
    )
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
            <div key={record.id} onClick={() => setRecordTel(record.tel)}>
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
