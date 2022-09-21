import React from "react";
import * as styles from "./Embed.module.scss";

function Embed({ src, size }) {
  return (
    <figure class={`${styles.container} ${styles[size]}`}>
      <div class={styles.iframeContainer}>
        <iframe src={src} loading="lazy" allowFullScreen frameborder="0"></iframe>
      </div>
    </figure>
  );
}

export { Embed };
