import React from "react";
import * as TermStyles from "./Term.module.scss";

export default function Term(props) {
  return <span className={TermStyles.container}>{props.t}</span>;
}
