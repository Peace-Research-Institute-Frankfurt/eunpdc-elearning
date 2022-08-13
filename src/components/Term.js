import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from "./Term.module.scss";

export default function Term(props) {
  const data = useStaticQuery(graphql`
    query TermQuery {
      terms: allTermsJson {
        nodes {
          term_id
          title
          description
        }
      }
    }
  `);

  const [active, setActive] = useState(false);

  // Let's find our term
  let term = null;
  data.terms.nodes.forEach((t) => {
    if (t.term_id === props.t) {
      term = t;
    }
  });

  function showTooltip() {
    setActive(true);
  }
  function hideTooltip() {
    setActive(false);
  }

  let tooltipClasses = [styles.tooltip];
  if (active) {
    tooltipClasses.push("is-active");
  }
  if (term) {
    return (
      <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.container}>
        {term.term_id}
        <span className={`${styles.tooltip} ${active ? styles.tooltipActive : ""}`}>
          <span className={styles.tooltipTitle}>{term.title}</span>
          <span className={styles.tooltipDescription}>{term.description}</span>
          <span className={styles.tooltipArrow}></span>
        </span>
      </span>
    );
  } else {
    return <>{props.t}</>;
  }
}
