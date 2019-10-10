import React from "react";
import WelcomeImg from "../../SVG/WelcomeImg/WelcomeImg";
import styles from "./WelcomePage.css";

export const WelcomePage = () => {
  return (
    <div>
      <h1 className={styles.title}>Welcome to TapRec recording calls app</h1>
      <WelcomeImg />
      <h3 className={styles.bottomTitle}>Seems you didn`t record any calls</h3>
    </div>
  );
};
