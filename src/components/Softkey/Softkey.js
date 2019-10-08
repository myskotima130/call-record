import React, { useEffect } from "react";
import styles from "./Softkey.css";

export const Softkey = ({
  left,
  onKeyLeft,
  center,
  onKeyCenter,
  right,
  onKeyRight
}) => {
  const handleKeyDown = evt => {
    switch (evt.key) {
      case "SoftLeft":
        return onKeyLeft && onKeyLeft(evt);
      case "Enter":
        return onKeyCenter && onKeyCenter(evt);
      case "SoftRight":
      case "ArrowRight":
        return onKeyRight && onKeyRight(evt);
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <label onClick={onKeyLeft} className={styles.left}>
        {left}
      </label>
      <label onClick={onKeyCenter} className={styles.center}>
        {center}
      </label>
      <label onClick={onKeyRight} className={styles.right}>
        {right}
      </label>
    </div>
  );
};
