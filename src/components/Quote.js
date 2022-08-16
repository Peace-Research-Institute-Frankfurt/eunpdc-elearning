import React from "react";
import * as QuoteStyles from "./Quote.module.scss";
import Audio from "./Audio";
export default function Quote(props) {
  let quoteType = "speech";
  if (props.type) {
    quoteType = props.type;
  }

  console.log(props.children);
  return (
    <>
      <blockquote className={[QuoteStyles[quoteType]].join(" ")}>
        <div className={QuoteStyles.text}>
          {props.children}
        </div>
        <cite>{props.cite}</cite>
        <div className={QuoteStyles.actions}>
          {props.audio && <Audio src={props.audio} type="minimal"></Audio>}
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
