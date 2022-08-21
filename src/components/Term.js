import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from "./Term.module.scss";
import Tooltip from "./Tooltip";

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
          <Tooltip position="top-center" active={active}>
            <div className={styles.content}>
              <span className={styles.title}>{term.title}</span>
              <span className={styles.description}>{term.description}</span>
            </div>
          </Tooltip>
        </button>
      </>
    );
  } else {
    return <>{props.t}</>;
  }
}
