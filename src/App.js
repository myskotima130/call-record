import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import { RecordsContainer, ContactsContainer, Search } from "./components";
import db from "./db/indexedDB";
import styles from "./App.css";

const App = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [records, setRecords] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("contact");

  const onDelete = id => {
    db.records.delete(id);
    setRecords([...records.filter(record => record.id !== id)]);
  };

  let chunks = [];
  useEffect(() => {
    db.records.toArray(data => setRecords(data));

    if (navigator.mozContacts) {
      const requestContacts = navigator.mozContacts.getAll({ sortBy: name });
      requestContacts.onsuccess = function() {
        if (this.result) {
          console.log("Name of Contact" + this.result.name);
          console.log("Number of Contact" + this.result.tel[0].value);

          contacts.push({
            name: this.result.name,
            tel: this.result.tel[0].value
          });

          this.continue();
        } else {
          setContacts(contacts);
        }
      };
    } else {
      setContacts([
        {
          name: "Amie Meyer",
          tel: "+380980243825"
        },
        {
          name: "contact name 2",
          tel: "+380982243325"
        },
        {
          name: "contact name 3",
          tel: "+380987273875"
        }
      ]);
    }

    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia =
        navigator.getUserMedia || navigator.mozGetUserMedia;
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(
        stream => {
          setMediaRecorder(new MediaRecorder(stream));
        },
        error => console.error(error)
      );
    } else {
      console.error("getUserMedia is not supported");
    }
  }, []);

  if (mediaRecorder) {
    mediaRecorder.onstop = () => {
      const clipName = prompt(
        "Enter a name for your record?",
        "My unnamed clip"
      );

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const id = uuid();
      db.records.add({ id, blob, title: clipName });
      setRecords([...records, { id, blob, title: clipName }]);

      console.log("recorder stopped");
    };

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };
  }

  return (
    <div className="App">
      <Search placeholder={`Search ${status}`} />
      <div className={styles.menu}>
        <h3 onClick={() => setStatus("contact")}>Contacts</h3>
        <h3 onClick={() => setStatus("records")}>Records</h3>
      </div>
      {status === "records" && (
        <RecordsContainer records={records} onDelete={onDelete} />
      )}
      {status === "contact" && (
        <ContactsContainer contacts={contacts} mediaRecorder={mediaRecorder} />
      )}
    </div>
  );
};

export default App;
