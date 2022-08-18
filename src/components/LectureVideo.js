import React from "react";
import * as styles from "./LectureVideo.module.scss"

export default function LectureVideo({ lu, vl, transcript, size, provider }) {
  let src = "";
  if (provider === "video-stream") {
    src = `https://start.video-stream-hosting.de/player_videojs.html?serverip=62.113.210.7&serverapp=hsfk2-vod&autostart=0&smil=${lu}/${lu}_${vl}.smil&bgimage=https://nonproliferation-elearning.eu/learningunits/disarmament-machinery/vid/${lu}_${vl}.jpg&untertitelDatei=https://nonproliferation-elearning.eu/learningunits/disarmament-machinery/vid/${lu}_${vl}.vtt&untertitelLand=en&untertitelAnzeige=English&untertitelAutoaktiv=0&nocookie=1`;
  } else {
    src = `https://nonproliferation-elearning.eu/learningunits/video.php?lu=${lu}&vl=${vl}&sub`;
  }

  return (
    <figure class={styles.container}>
      <div class={styles.iframeContainer}>
        {/* <video controls src={src}></video> */}
        <iframe title={`lecture-${vl}`} src={src} loading="lazy" allowfullscreen frameborder="0"></iframe>
      </div>
      <figcaption className={styles.caption}>
        <a href="#1">Download Transcript (PDF)</a>
      </figcaption>
    </figure>
  );
}
