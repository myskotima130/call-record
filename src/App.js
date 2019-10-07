import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  RecordsContainer,
  ContactsContainer,
  Search,
  Header,
  Softkey,
  CallReceive
} from "./components";
import db from "./db/indexedDB";
import styles from "./App.css";

const App = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [records, setRecords] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("contact");
  const [telephonyCall] = useState(navigator.mozTelephony);
  const [callInfo, setCallInfo] = useState({
    callerNumber: "",
    callerName: ""
  });

  useEffect(() => {
    if (telephonyCall) {
      telephonyCall.onincoming = e => {
        const requestName = navigator.mozContacts.find({
          filterBy: ["tel"],
          filterValue: e.call.id
        });

        requestName.onsuccess = function() {
          setCallInfo({
            callerName: this.result.name,
            callerNumber: e.call.id
          });
        };
      };
    } else {
      setCallInfo({
        callerName: "test name",
        callerNumber: "+380985367942"
      });
    }
  }, [telephonyCall]);

  const addRecord = record => {
    setRecords([...records, record]);
    setCallInfo({
      callerName: "",
      callerNumber: ""
    });
  };

  const contactStyle = classnames(styles.item, {
    [styles.active]: status === "contact",
    [styles.passive]: status !== "contact"
  });

  const recordsStyle = classnames(styles.item, {
    [styles.active]: status === "records",
    [styles.passive]: status !== "records"
  });

  const onDelete = id => {
    db.records.delete(id);
    setRecords([...records.filter(record => record.id !== id)]);
  };

  useEffect(() => {
    db.records.toArray(data => setRecords(data));

    if (navigator.mozContacts) {
      const requestContacts = navigator.mozContacts.getAll({ sortBy: name }); // filterValue: (tel number)
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
          name: "azet Gray",
          tel: "+380982243325"
        },
        {
          name: "Berest Moss",
          tel: "+380987273875"
        },
        {
          name: "Bob Smit",
          tel: "+380987243873"
        },
        {
          name: "Boniface Esanji",
          tel: "+380926784875"
        },
        {
          name: "Evelin Allen",
          tel: "+380995033873"
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

  const onClickContact = () => {
    setStatus("contact");
  };

  return (
    <div className="App">
      {callInfo.callerNumber && (
        <CallReceive
          callInfo={callInfo}
          mediaRecorder={mediaRecorder}
          addRecord={addRecord}
        />
      )}
      <Header />
      <Search placeholder={`Search ${status}`} />
      <div className={styles.menu}>
        <p className={contactStyle} onClick={onClickContact}>
          Contacts
        </p>
        <p className={recordsStyle} onClick={() => setStatus("records")}>
          Records
        </p>
      </div>
      {status === "contact" && (
        <ContactsContainer
          addRecord={addRecord}
          contacts={contacts}
          mediaRecorder={mediaRecorder}
        />
      )}
      {status === "records" && (
        <RecordsContainer records={records} onDelete={onDelete} />
      )}
      <Softkey
        center="Select"
        // onKeyCenter={onKeyCenter}
        right="Delete"
        left="Rename"
        // onKeyRight={onKeyRight}
      />
    </div>
  );
};

export default App;
