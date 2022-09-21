import React from "react";
import * as styles from "./SiteFooter.module.scss";

export default function SiteFooter() {
  return (
    <footer className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#1">EUNPDC</a>
          </li>
          <li>
            <a href="#1">PRIF</a>
          </li>
          <li>
            <a href="#1">Terms</a>
          </li>
          <li>
            <a href="#1">Privacy</a>
          </li>
          <li>
            <a href="#1">Contact</a>
          </li>
        </ul>
      </nav>
      <p>
        The EU Non-Proliferation and Disarmament eLearning Course aims to cover all aspects of the EU non-proliferation and disarmament agenda. It's
        produced by PRIF with financial assistance of the European Union. The contents of individual learning units are the sole responsibility of the respective authors and don't necessariy reflect the position of the European Union.
      </p>
    </footer>
  );
}
