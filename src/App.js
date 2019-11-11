import React, { useState, useEffect } from "react";
import { MainContainer, Softkey, WelcomePage } from "./components";
import db from "./db/indexedDB";
import styles from "./App.css";

const App = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [records, setRecords] = useState([]);
  const [softkey, setSoftkey] = useState({
    left: "",
    center: "",
    right: ""
  });

  const [contactsFromPhone, setContactsFromPhone] = useState([]);

  const addRecord = record => setRecords([...records, record]);

  const onDelete = id => {
    db.records.delete(id);
    setRecords([...records.filter(record => record.id !== id)]);
  };

  useEffect(() => {
    db.records.toArray(data => setRecords(data));

    if (navigator.mozContacts) {
      console.log("get all mozContacts");

      const requestContacts = navigator.mozContacts.getAll({ sortBy: name }); // filterValue: (tel number)
      requestContacts.onsuccess = function() {
        if (this.result) {
          console.log("Name of Contact" + this.result.name);
          console.log("Number of Contact" + this.result.tel[0].value);

          setContactsFromPhone.push({
            name: this.result.name,
            tel: this.result.tel[0].value
          });

          this.continue();
        } else {
          setContactsFromPhone(contactsFromPhone);
        }
      };
    } else {
      setContactsFromPhone([
        {
          name: "Amie Meyer",
          tel: "+74732334425"
        },
        {
          name: "Azet Gray",
          tel: "+74732334412"
        },
        {
          name: "Berest Moss",
          tel: "+74732334635"
        },
        {
          name: "Bob Smit",
          tel: "+74732334079"
        },
        {
          name: "Boniface Esanji",
          tel: "+74732334490"
        },
        {
          name: "Evelin Allen",
          tel: "+74732334212"
        },
        {
          name: "Roman Kutepov",
          tel: "+74736834212"
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

  return (
    <div className={styles.wrapper}>
      {records.length ? (
        <React.Fragment>
          <MainContainer
            contactsFromPhone={contactsFromPhone}
            mediaRecorder={mediaRecorder}
            addRecord={addRecord}
            status={status}
            setSoftkey={setSoftkey}
            softkey={softkey}
            contacts={records}
            onDelete={onDelete}
            isShowOptions={isShowOptions}
            setIsShowOptions={setIsShowOptions}
          />
          <Softkey
            left={softkey.left}
            onKeyLeft={softkey.onKeyLeft}
            center={softkey.center}
            onKeyCenter={softkey.onKeyCenter}
            right={softkey.right}
            onKeyRight={softkey.onKeyRight}
            onArrowRight={softkey.onArrowRight}
            onArrowLeft={softkey.onArrowLeft}
          />
        </React.Fragment>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
};

export default App;
