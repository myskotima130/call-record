import React, { useState, useEffect } from "react";
import { pure } from "recompose";
import moment from "moment";
import { Options } from "../Options/Options";
import { Search } from "../Search/Search";
import { useNavigation } from "../../hooks";
import db from "../../db/indexedDB";
import Records from "./Records/Records";
import styles from "./RecordsContainer.css";

export const RecordsContainer = pure(
  ({
    contacts,
    onDelete,
    softkey,
    setSoftkey,
    setIsShowOptions,
    isShowOptions
  }) => {
    const [current] = useNavigation();
    const [index, setIndex] = useState(0);
    const [recordTel, setRecordTel] = useState(null);
    const [contact, setContact] = useState(null);
    const [records, setRecords] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [staticRecords, setStaticRecords] = useState([]);

    const displayedRecords = [];
    const sortedContacts = contacts.sort((a, b) => (a.date > b.date ? -1 : 1));
    const sortedRecords = records.sort((a, b) => (a.date > b.date ? -1 : 1));

    const allContacts = searchResult || sortedContacts;

    useEffect(() => {
      setStaticRecords(sortedContacts);
    }, []);

    useEffect(() => {
      if (recordTel) {
        db.records
          .where("tel")
          .equals(recordTel)
          .toArray(data => setRecords(data));
      }
      setIndex(0);
      scroll(0, 0);
      setSearchResult(null);
    }, [recordTel]);

    const showOptions = () => setIsShowOptions(!isShowOptions);

    const getBack = () => {
      if (!isShowOptions) {
        setRecordTel(null);
      }
      setIsShowOptions(false);
      setIndex(0);
    };

    useEffect(() => {
      if (!isShowOptions) {
        const element = document.querySelector("[nav-selected=true]");
        const index = element
          ? parseInt(element.getAttribute("nav-index"), 10)
          : 0;

        setIndex(index);

        if (element.getAttribute("search")) {
          setSoftkey({
            ...softkey,
            center: "Select",
            onKeyCenter: () => console.log("clicked on search")
          });
        } else if (element.getAttribute("record") && index > 3) {
          element.scrollIntoView(false);
          scroll(0, pageYOffset + 40);
        } else if (index > 6) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        if (sortedContacts.length && index > 0) {
          setSoftkey({
            ...softkey,
            onKeyCenter: () => {
              if (element.getAttribute("record")) {
                element.children[0].click();
              } else if (element.getAttribute("contact")) {
                setRecordTel(displayedRecords[index - 1].tel);
                setContact(displayedRecords[index - 1]);
              }
            }
          });
        }
      }
    }, [current]);

    useEffect(() => {
      setSoftkey({
        ...softkey,
        left: recordTel ? (isShowOptions ? "Cancel" : "Back") : "",
        right: recordTel ? (index === 0 || isShowOptions ? "" : "Options") : "",
        center:
          recordTel && index !== 0
            ? isShowOptions
              ? "Save"
              : "Play"
            : "Select",
        onKeyRight: showOptions,
        onKeyLeft: getBack
      });
    }, [recordTel, isShowOptions, index]);

    const onDeleteClick = id => {
      if (sortedRecords.length === 1) {
        setRecordTel(null);
      }
      setRecords([...records.filter(record => record.id !== id)]);
      onDelete(id);
      getBack();
    };

    const onUpdateTitle = (id, title) => {
      setRecords([
        ...records.map(record =>
          record.id === id ? { ...record, title } : record
        )
      ]);
      db.records.update(id, { title });
      getBack();
    };

    return (
      <React.Fragment>
        <Search
          placeholder={`Search ${status}`}
          selectable={!isShowOptions}
          setSoftkey={setSoftkey}
          softkey={softkey}
          forSearch={recordTel ? records : staticRecords}
          searchBy={recordTel ? "title" : "name"}
          setSearchResult={setSearchResult}
        />
        {recordTel ? (
          isShowOptions ? (
            <div className={styles.options}>
              <Options
                onDelete={onDeleteClick}
                record={sortedRecords[index - 1]}
                setSoftkey={setSoftkey}
                softkey={softkey}
                current={current}
                onUpdateTitle={onUpdateTitle}
              />
            </div>
          ) : (
            <Records
              sortedRecords={searchResult || sortedRecords}
              contact={contact}
            />
          )
        ) : (
          <div className={styles.wrapper}>
            {allContacts.length ? (
              allContacts.map(record => {
                if (displayedRecords.find(rec => rec.tel === record.tel))
                  return null;
                const allRecords = allContacts.filter(
                  rec => rec.tel === record.tel
                );
                const fromNow = moment(allRecords[0].date)
                  .fromNow()
                  .replace("minutes" || "minute", "min.");
                displayedRecords.push(record);

                return (
                  <div
                    className={styles.itemWrapper}
                    nav-selectable="true"
                    key={record.id}
                    onClick={() => setRecordTel(record.tel)}
                    contact="true"
                  >
                    <div className={styles.top}>
                      <p className={styles.name}>{record.name}</p>
                      <p className={styles.col}>{allRecords.length}</p>
                    </div>
                    <div className={styles.bottom}>
                      <p className={styles.tel}>{record.tel}</p>
                      <p className={styles.fromNow}>{fromNow}</p>
                    </div>
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
        )}
      </React.Fragment>
    );
  }
);
