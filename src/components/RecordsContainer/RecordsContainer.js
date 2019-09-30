import React from "react";
import "./RecordsContainer.css";

export const RecordsContainer = ({ records, onDelete }) => {
  return (
    <div>
      <h1>Records</h1>
      {records.map(record => (
        <div key={record.id}>
          <h3>{record.title}</h3>
          <audio src={URL.createObjectURL(record.blob)} controls></audio>
          <button onClick={() => onDelete(record.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};
