import React, { useState, useEffect } from "react";
import styles from "./Records.css";
import Record from './Record/Record';
import db from "../../../db/indexedDB";

const Records = ({ recordTel }) => {
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    db.records.where({ tel: recordTel }).toArray(data => setRecords(data));
  }, []);

  return records.length > 0 ? (
    <div className={styles.wrapper}>
      {records.map((record, index) => (
        <Record  key={record.id} record={record} />
      ))}
    </div>
  ) : null;
};

export default Records;
