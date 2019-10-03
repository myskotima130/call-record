import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./Header.css";

export const Header = () => {
  const [time, setTime] = useState(moment().format("h:m A"));
  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("h:m A"));
    }, 1000);
  }, []);
  return <div className={styles.wrapper}>{time}</div>;
};
