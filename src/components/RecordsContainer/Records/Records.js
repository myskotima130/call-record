import React, { useState, useEffect, useRef } from "react";
import styles from "./Records.css";
import db from "../../../db/indexedDB";

const Records = ({ recordTel }) => {
  const [records, setRecords] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    db.records.where({ tel: recordTel }).toArray(data => setRecords(data));
  }, []);
  console.log(records);

  const onClickPlay = () => {
    console.log(audioRef);

    audioRef.current.play();
  };
  return records.length > 0 ? (
    <div className={styles.wrapper}>
      {records.map(record => (
        <div key={record.id} className={styles.itemWrapper}>
          <p className={styles.title}>{record.title}</p>
          <audio
            ref={audioRef}
            src={URL.createObjectURL(record.blob)}
            controls
          ></audio>
          <button onClick={onClickPlay}>play</button>
        </div>
      ))}
    </div>
  ) : null;
};

export default Records;
