import React, { useState } from "react";
import * as QuoteStyles from "./Quote.module.scss";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Quote(props) {
  let quoteType = "speech";
  const [playing, setPlaying] = useState(false);
  if (props.type) {
    quoteType = props.type;
  }
  return (
    <>
      <blockquote className={[QuoteStyles[quoteType]].join(" ")}>
        <div className={QuoteStyles.text}>{props.children}</div>
        {props.audio && <audio controls></audio>}
        <cite>{props.cite}</cite>
        <div className={QuoteStyles.actions}>
          {props.audio && (
            <button className={QuoteStyles.actionItem} href={props.source}>
              Listen
            </button>
          )}
          {props.fullDocument && (
            <a className={QuoteStyles.actionItem} href={props.fullDocument}>
              Read full document
            </a>
          )}
        </div>
      </blockquote>
    </>
  );
}
