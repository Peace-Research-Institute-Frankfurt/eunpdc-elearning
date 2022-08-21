import React from "react";
import * as styles from "./Button.module.scss";

export default function Button({ label }) {
  return <button className={styles.container}>{label}</button>;
}
