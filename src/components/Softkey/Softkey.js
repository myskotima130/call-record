import React, { useEffect, useRef } from "react";
import styles from "./Softkey.css";

export const Softkey = ({
  left,
  onKeyLeft,
  center,
  onKeyCenter,
  right,
  onKeyRight
}) => {
  const refLeft = useRef();
  const refCenter = useRef();
  const refRight = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = evt => {
    switch (evt.key) {

      case "SoftLeft": {
        console.log("SoftLevt inside");
        refLeft.current.click();
        break;
      }
        
      case "Enter": {
        refCenter.current.click();
        break;
      }
        
      case "SoftRight":{
        refRight.current.click();
        break;
      }
      default:
        return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <label ref={refLeft} onClick={onKeyLeft} className={styles.left}>
        {left}
      </label>
      <label ref={refCenter} onClick={onKeyCenter} className={styles.center}>
        {center}
      </label>
      <label ref={refRight} onClick={onKeyRight} className={styles.right}>
        {right}
      </label>
    </div>
  );
};
