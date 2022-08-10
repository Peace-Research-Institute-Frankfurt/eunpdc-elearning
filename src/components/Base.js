import React from "react";
import "./global.scss";
import { Link } from "gatsby";

function Base(props) {
  return (
    <>
      <header className="site__header">
        <h1>
          <Link to="/">EUNPDC E-Learning</Link>
        </h1>
      </header>
      <main className="site__content">
      {props.children}
      </main>
    </>
  );
}

export default Base;
