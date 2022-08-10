import React from "react";
import * as QuoteStyles from "./Quote.module.scss";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Quote(props) {
  let quoteType = "speech";
  if (props.type) {
    quoteType = props.type;
  }
  return (
    <blockquote className={[QuoteStyles[quoteType]].join(" ")}>
      <div className={QuoteStyles.text}>{props.children}</div>
      <cite>
        {props.cite}
        {props.source && (
          <a className={QuoteStyles.source} href={props.source}>
            Read full document
          </a>
        )}
      </cite>
    </blockquote>
  );
}
