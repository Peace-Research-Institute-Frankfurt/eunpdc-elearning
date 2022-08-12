import React, { useRef, useState } from "react";
import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";
import { graphql, useStaticQuery } from "gatsby";
import * as Styles from "./Audio.module.scss";

export default function Audio({ src, type }) {
  const data = useStaticQuery(graphql`
    query {
      files: allFile {
        nodes {
          base
          publicURL
        }
      }
    }
  `);

  // Let's find our image
  let file = null;
  data.files.nodes.forEach((f) => {
    if (f.base === src) {
      file = f;
    }
  });

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();

  function handleAudioError(err) {}

  function toggleAudio() {
    console.log("hi");
    if (playing) {
      setPlaying(false);
      audioRef.current.pause();
    } else {
      setPlaying(true);
      audioRef.current.play();
    }
  }
  return (
    <>
      <audio src={file.publicURL} ref={audioRef} onError={handleAudioError}></audio>
      <button className={Styles.container} onClick={toggleAudio}>
        {playing ? <img src={pauseIcon} alt="" /> : <img src={playIcon} alt="" />}
        {playing ? "Pause" : "Listen"}
      </button>
    </>
  );
}
