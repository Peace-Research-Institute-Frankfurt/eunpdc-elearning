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

  if (term) {
    return (
      <>
        <button onMouseEnter={showTooltip} onFocus={showTooltip} onMouseLeave={hideTooltip} onBlur={hideTooltip} className={styles.container}>
          {props.children ? <>{props.children}</> : <>{term.term_id}</>}
        <aside role="tooltip" className={`${styles.tooltip} ${active ? styles.tooltipActive : ""}`}>
          <span className={styles.tooltipTitle}>{term.title}</span>
          <span className={styles.tooltipDescription}>{term.description}</span>
          <span className={styles.tooltipArrow}></span>
        </aside>
        </button>
      </>
    );
  } else {
    return <>{props.t}</>;
  }
}
